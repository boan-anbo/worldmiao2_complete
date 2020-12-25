<template>
  <div class="bg-gray-700 px-4 truncate text-white text-lg text-center sm:text-right pr-8" style="font-family: 'Iceland', sans-serif; background-color: #5D8D89" >
<!--  noti  -->
   <span class="sm:inline hidden"> worldmiao.two | </span>
    <span class="text-xs"> 世界喵兔 </span>
    <span class="inline">| ebook search engine</span>
  </div>

  <div
      id="main-panel-layout"

      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 4xl:grid-cols-8"
  >
  <div
        v-for="(provider, providerIndex) in bookProviderList"
        :key="providerIndex"
  >


          <Library
            :bookStore="bookStore[provider.providerEnum]" :library-name="provider.providerName" :colIsEven="providerIndex % 2 === 0" :book-provider="provider.providerEnum" :library-url="provider.url"
            :being-maintained="provider.beingMaintained"
            :showAllLibraryBoxes="showAllLibraryBoxes"
            :holdings="provider.holdings"
            :library-index="providerIndex"
          >

        <template v-slot:search-box>

<!--       Panel for showing search box. pass down to library as slot. -->
          <SearchBox
              class="static"
              :searchInputMinLength="searchInputMinLength"
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
<div class=" bg-gray-700  text-white text-lg px-4" style="font-family: 'Iceland', sans-serif; background-color: #5D8D89" >

  <div class=" w-full">

<!--        <span>suggestion</span>-->
    <input type="text"
           maxlength="300"
           v-model="suggestionContent"
           @focus="onSuggestionInputFocused"
           @blur="suggestionFocused = false"
           :class="{
             'hover:underline': this.suggestionFocused === false && this.suggestionSent === false && this.suggestionContent.length === 0,
           'text-center': this.suggestionContent.length === 0,
           'cursor-pointer': this.suggestionFocused === false,
           'border-b': this.suggestionFocused === true,
           }"
           class="text-base px-1 outline-none   placeholder-gray-100 text-center "
           style="background: #5D8D89;  min-width: 100px; width: 250px"
           :placeholder="this.suggestionFocused ? '' : ( this.suggestionSent ? 'thank you for contributing.' : 'click to add links, bugs, & suggestions.')" />
    <span v-if="suggestionFocused || suggestionContent.length > 0" @click="makeSuggestion()" @keyup.enter="makeSuggestion()" class="  pl-2">
      <span :class="{ 'text-gray-400' : suggestionContent.length === 0 }" class="cursor-pointer hover:underline">submit</span>
    </span>
  </div>
  <div class="text-center text-base  sm:inline sm:col-span-1"> (bo an 2020)</div>
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
      suggestionContent: '',
      suggestionSent: false,
      suggestionFocused: false,
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
        GUTENBERG: new SearchStatus(BookProvider.GUTENBERG),
        PROLETARIAT: new SearchStatus(BookProvider.PROLETARIAT),
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
        ZLIBRARY: {},
        PROLETARIAT: {},
        GUTENBERG: {}
      } as BookStore
      ,
      showAllLibraryBoxes: new Subject(),
      // to check if the current search all request is updated and drop the old one in the process.
      currentSearchAllRequestId: '',
      searchInputMinLength: 1
    }
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
      this.bookProviderList.forEach((provider) => {
        this.showAllLibraryBoxes.next(provider.providerEnum);
      })

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
      // const url = './api/scraper';
      const url = 'http://localhost:9000/scraper';

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
    },
    makeSuggestion: async function () {
      if (this.suggestionContent.length > this.searchInputMinLength) {
        const url = 'http://localhost:9000/suggestion';
        console.log('sending suggestion to back end', this.suggestionContent, url)
        this.suggestionSent = false
        const res = await this.axios.post(url, {content: this.suggestionContent})
        console.log(res)
        // if suggestion submission is successful
        if (res.status === 201) {
          this.suggestionSent = true
          this.suggestionContent = ''
        }
      }
    },
    onSuggestionInputFocused() {

        this.suggestionFocused = true
        this.suggestionSent = false

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

