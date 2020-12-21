<template>
  <div class="bg-gray-700 px-4 truncate text-white text-lg text-center sm:text-right pr-8" style="font-family: 'Iceland', sans-serif; background-color: #5D8D89" >
<!--  noti  -->
   <span class="sm:inline hidden"> worldmiao.two | </span>
    <span class="text-xs"> 世界喵兔 </span>
    <span class="inline">| ebook search engine</span>
  </div>

  <div
      id="main-panel-layout"

      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6"
  >
  <div
        v-for="(provider, providerIndex) in bookProviderList"
        :key="providerIndex"
  >


          <Library
            :bookStore="bookStore[provider.providerEnum]" :library-name="provider.providerName" :colIsEven="providerIndex % 2 === 0" :book-provider="provider.providerEnum" :library-url="provider.url"
            :being-maintained="provider.beingMaintained"
            :showAllLibraryBoxes="showAllLibraryBoxes"
          >

        <template v-slot:search-box>

<!--       Panel for showing search box. pass down to library as slot. -->
          <SearchBox
              class="static"
              :book-provider="provider.providerEnum"
              @search-request="onSearchRequest"
              :search-all="state.searchAll"
              @on-search-all="onSearchAll"
              v-model:searchTerm="state.searchTerm"/>
        </template>
  <!--      Provide searching status-->
        <template   v-slot:search-status="{
          closeBookshelfHandler,
          shelfIsEmpty
        }"
        >
<!--     Pnale for showing results. pass down to Library.   -->
          <SearchStatusPanel
              @close-bookshelf="closeBookshelfHandler"
              :shelfIsEmpty="shelfIsEmpty"
              :book-provider="provider.providerEnum" :bookStore="bookStore" :searchStore="searchStore"
              @reuse-search-term="onReuseSearchTerm"
          />
        </template>

    </Library>
  </div>
  </div>
    <div class="bg-gray-700 text-white text-lg text-right pr-8" style="font-family: 'Iceland', sans-serif; background-color: #5D8D89" >
      <span>(bo an 2020)</span>
    </div>


</template>


<script lang="ts">


import {Book, BookProvider, BookProviderList} from "@/entities/book.entity";
import {defineComponent} from "vue";
import {reactive} from "vue";
// eslint-disable-next-line no-unused-vars
import {AppProps, BookStore} from "@/interfaces/AppProps";
// eslint-disable-next-line no-unused-vars
import {ScrapingCenterSuccessResponse} from "@/interfaces/ScrapingCenterSuccessResponse";
import Library from "@/components/Library.vue";
import SearchBox from "@/components/SearchBox.vue";
import SearchStatusPanel from "@/components/SearchStatusPanel.vue";
// eslint-disable-next-line no-unused-vars
import {LibrarySearchStatus, SearchStatus, SearchStore} from "@/entities/app.entity";
import { v4 } from 'uuid';
import { Subject } from 'rxjs'
export default defineComponent({
  name: 'App',
  setup(){

    const state = reactive({
      searchTerm: '',
      searchAll: false


    } as AppProps);
    const bookProviderList = BookProviderList
    return {
      bookProviderList,
      state
    }
  },
  data() {
    return {
      bookProvider: BookProvider,
      libraryOrder: [
      ],
      searchStore: {
        GOOGLE_BOOKS: new SearchStatus(BookProvider.GOOGLE_BOOKS),
        MEMORY_OF_THE_WORLD: new SearchStatus(BookProvider.MEMORY_OF_THE_WORLD),
        LIBRARY_GENESIS: new SearchStatus(BookProvider.LIBRARY_GENESIS),
        OPEN_LIBRARY: new SearchStatus(BookProvider.OPEN_LIBRARY),
        WORLD_CAT: new SearchStatus(BookProvider.WORLD_CAT),
        ZLIBRARY: new SearchStatus(BookProvider.ZLIBRARY),
      } as SearchStore
      ,
      bookStore: {
        GOOGLE_BOOKS: {
          // data: new Array(20)
        },
        MEMORY_OF_THE_WORLD: {},
        LIBRARY_GENESIS: {},
        OPEN_LIBRARY: {},
        WORLD_CAT: {},
        ZLIBRARY: {}
      } as BookStore
      ,
      showAllLibraryBoxes: new Subject(),
      // to check if the current search all request is updated and drop the old one in the process.
      currentSearchAllRequestId: ''
    }
  },
  computed: {

  },
  methods: {
    test() {
      console.log("app.vue received close bookshelf")
    },
    onSearchRequest: async function (globalProvider: BookProvider) {
      // check if need to search all libraries
      if (this.state.searchAll) {
        this.searchAll()
      } else {
        this.sendSearchRequest(globalProvider)
      }
    },
    searchAll: async function() {
      // if so, show all library boxes first
      this.showAllLibraryBoxes.next(); // it needs to be reset to false first to trigger vue property change watch in library component.
      // generate an uuid for the current search all request, and save it globally;
      const uniqueSearchAllRequestId = v4();
      this.currentSearchAllRequestId = uniqueSearchAllRequestId;


      for await (const providerEntry of this.bookProviderList) {
        // when the global current search id doesn't match local search id, break out of the loop.
        if (this.currentSearchAllRequestId !== uniqueSearchAllRequestId) {
          break;
        }
        await this.sendSearchRequest(providerEntry.providerEnum, uniqueSearchAllRequestId)
      }
    }
    ,
    sendSearchRequest: async function(provider: BookProvider, uniqueSearchAllRequestId?: string) {
      const { searchTerm } = this.state;
      // const url = 'https://www.worldmiao.com/api/scraper/'
      const url = './api/scraper';
      // const url = 'http://localhost:9000/scraper';

      console.log("Posting your request for ", provider, 'for term', searchTerm, " to", url)
      // update search status
      this.setSearchStatus(provider, LibrarySearchStatus.SEARCHING)
      this.setSearchTerm(provider, searchTerm);

      // sending http request
      const {data} = await this.axios.post<ScrapingCenterSuccessResponse>(url, {title:searchTerm, provider})
      if (!data) {
        this.setSearchStatus(provider, LibrarySearchStatus.ERROR)
      }

      console.log(`Received Response From Server for ${provider}, for term ${searchTerm}, data:`, data)

      if (uniqueSearchAllRequestId && this.currentSearchAllRequestId !== uniqueSearchAllRequestId) {
        console.log('batch search request dropped, drop the fetched data')
        return
      }

      const revivedBooks = (data as ScrapingCenterSuccessResponse).data.map(item => Object.assign(new Book(provider), item))
      data.data = revivedBooks;
      this.bookStore[provider] = {...data};

      this.setSearchStatus(provider, LibrarySearchStatus.SEARCH_FINISHED)
      this.setSearchResultCount(provider, data?.data?.length)
      return
    },
    setSearchStatus: function(provider: BookProvider, searchStatus: LibrarySearchStatus)  {
       this.getSearchStatus(provider).setSearchStatus(searchStatus)
    },

    setSearchTerm: function (provider: BookProvider, searchTerm: string) {
      this.getSearchStatus(provider).setSearchedTerm(searchTerm)
    },
    getSearchStatus: function(provider: BookProvider) {
       return this.searchStore[provider]
    },
    setSearchResultCount: function(provider: BookProvider, count: number) {

      this.getSearchStatus(provider).setSearchResultCount(count)
    },
    onReuseSearchTerm:function(provider: BookProvider, searchTerm: string) {


      console.log('On Reuse Search Term', provider, searchTerm)
      // this.setSearchTerm(provider, searchTerm)
      this.state.searchTerm = searchTerm
    },
    onSearchAll: function(isSearchAllChecked: boolean) {
      console.log('parent received isSearchALl Checked', isSearchAllChecked)
      this.state.searchAll = isSearchAllChecked
    }
    },
  components: {
    Library,
    SearchBox,
    SearchStatusPanel
  }
})
</script>

<style>


#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/

}
</style>

