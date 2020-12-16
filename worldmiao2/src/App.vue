<template>
  <div >

<a-row >

  <a-col
      :span="24/6" :xl="24/6" :xs="24" :sm="24/2" :md="24/3"
      v-for="(provider, providerIndex) in bookProviderList"
      :key="providerIndex"
      class=""
  >
  <input type="text" v-model="testUrl" />Enter Test Url
    <Library :bookStore="bookStore" :library-name="provider.providerName" :colIsEven="providerIndex % 2 === 0" :book-provider="provider.providerEnum">

      <SearchBox :book-provider="provider.providerEnum"  @search-request="onSearchRequest"   v-model:searchTerm="state.searchTerm"/>
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
import SearchBox from "@/SearchBox.vue";
import Library from "@/Library.vue";


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
      testUrl: 'http://app:' + 3000,
      bookProvider: BookProvider,
      libraryOrder: [
      ],
      bookStore: {
        GOOGLE_BOOKS: {},
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
     onSearchRequest: async function (provider: BookProvider) {
        const url = 'http://localhost:' + 3000 + `/scraper`
       console.log("Received your request", provider, 'for term', this.state.searchTerm, "resnding request to", url)
       const {data} = await this.axios.post<ScrapingCenterSuccessResponse>(url, {title: this.state.searchTerm, provider})

       const revivedBooks = (data as ScrapingCenterSuccessResponse).data.map(item => Object.assign(new Book(provider), item))
       data.data = revivedBooks;
       // const loadedBooks = {data}
       this.bookStore[provider] = {...data};
       // const response: ScrapingCenterSuccessResponse = JSON.parse(data);
       // console.log(response)
     }

  },
  components: {
    Library,
    SearchBox
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

