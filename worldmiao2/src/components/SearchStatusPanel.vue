<template>
  <div class="grid grid-cols-12">
    <div class="text-center col-span-6">{{getSearchTerm}}</div>
    <div class="status col-span-2 text-left">{{searchStore[bookProvider].getCurrentStatus()}}</div>
    <div v-if="searchStore[bookProvider].getCurrentStatus() === librarySearchStatus.SEARCH_FINISHED" class="result-count col-span-2 text-left">({{searchStore[bookProvider].getSearchResultCount()}} hits.)</div>
    <div class="text-left col-span-1" id="search-timer">{{getSearchTime}}</div>
  </div>
</template>
<script lang="js">
// eslint-disable-next-line no-unused-vars
import {BookProvider} from "@/entities/book.entity";
// eslint-disable-next-line no-unused-vars
import {LibrarySearchStatus, SearchStore} from "@/entities/app.entity";
// eslint-disable-next-line no-unused-vars
import {BookStore} from "@/interfaces/AppProps";

export default {
  name: 'SearchStatusPanel',
  props: ['bookStore', 'searchStore', 'bookProvider'],
  setup(props) {
    console.log(props)
    const timer = props.searchStore[props.bookProvider].getTimerValue();
    const status = props.searchStore[props.bookProvider].getCurrentStatus();
    const statusString = props.bookProvider + timer;
    return {
      statusString,
      timer,
      status
    }
  },
  data() {
    return {
      librarySearchStatus: LibrarySearchStatus
    }
  },
  computed: {
    getSearchTerm() {
      if (this.searchStore[this.bookProvider].getSearchedTerm()) {
        return `"${this.searchStore[this.bookProvider].getSearchedTerm()}"`;
      }
      return ''

    },
    getSearchTime() {
      return this.searchStore[this.bookProvider].getTimerValue() + 's';
    },
    getSearchResultCount() {
      return this.searchStore[this.bookProvider].getSearchResultCount() + ' hits.';
    }
  },
  method: {

  }
}
</script>
