<template>
  <div >

<a-row >

  <a-col
      :span="24/4" :xl="24/4" :xs="24" :sm="24/2"
      v-for="(provider, providerIndex) in bookProviderList"
      :key="providerIndex"
      class=""
  >
<!--  <input type="text" v-model="testUrl" />Enter Test Url-->
    <Library :bookStore="bookStore" :library-name="provider.providerName" :colIsEven="providerIndex % 2 === 0" :book-provider="provider.providerEnum">

      <template v-slot:search-box>
        <SearchBox :book-provider="provider.providerEnum"  @search-request="onSearchRequest"   v-model:searchTerm="state.searchTerm"/>
      </template>
      <template v-slot:fetch-status>
        <FetchStatus :book-provider="provider.providerEnum" :bookStore="bookStore" :searchStore="searchStore" />
      </template>

    </Library>

  </a-col>

  </a-row>
    <a-row class="bg-gray-700 text-white text-lg text-right pr-8" style="font-family: 'Iceland', sans-serif;" >
      <a-col :span="24">
        worldmiao.two (bo an 2020)
      </a-col>
    </a-row>
  </div>

</template>


<script lang="ts">


import {Book, BookProvider, BookProviderList} from "@/entities/book.entity";
import {defineComponent} from "@vue/composition-api";
import {reactive} from "vue";
// eslint-disable-next-line no-unused-vars
import {AppProps, BookStore} from "@/interfaces/AppProps";
// eslint-disable-next-line no-unused-vars
import {ScrapingCenterSuccessResponse} from "@/interfaces/ScrapingCenterSuccessResponse";
import Library from "@/components/Library.vue";
import SearchBox from "@/components/SearchBox.vue";
import FetchStatus from "@/components/FetchStatus.vue";
// eslint-disable-next-line no-unused-vars
import {LibrarySearchStatus, SearchStatus, SearchStore} from "@/entities/app.entity";


export default defineComponent({
  name: 'App',
  setup(){

    const state = reactive({
      searchTerm: '',

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
      } as SearchStore
      ,
      bookStore: {
        GOOGLE_BOOKS: {
          data: new Array(20)
        },
        MEMORY_OF_THE_WORLD: {},
        LIBRARY_GENESIS: {},
        OPEN_LIBRARY: {},
        WORLD_CAT: {}
      } as BookStore

    }
  },
  computed: {

  },
  methods: {
       onSearchRequest: async function (globalProvider: BookProvider) {
         const provider: BookProvider = globalProvider
         const { searchTerm } = this.state;
          const url = 'http://localhost:' + 9000 + `/scraper`
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

         const revivedBooks = (data as ScrapingCenterSuccessResponse).data.map(item => Object.assign(new Book(provider), item))
         data.data = revivedBooks;
         this.bookStore[provider] = {...data};

         this.setSearchStatus(provider, LibrarySearchStatus.SEARCH_FINISHED)

       },

     setSearchStatus: function(provider: BookProvider, searchStatus: LibrarySearchStatus)  {
       this.getSearchStatus(provider).setSearchStatus(searchStatus)
     },

    setSearchTerm: function (provider: BookProvider, searchTerm: string) {
       this.getSearchStatus(provider).setSearchedTerm(searchTerm)
    },
    getSearchStatus: function(provider: BookProvider) {
         return this.searchStore[provider]
    }



  },
  components: {
    Library,
    SearchBox,
    FetchStatus
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

