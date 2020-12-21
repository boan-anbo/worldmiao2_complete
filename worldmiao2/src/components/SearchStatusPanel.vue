<style>


</style>
<template>

  <div class="grid grid-cols-8 space-y-0 text-xs ">
<!--  search term record  -->
    <div class=" text-center col-span-8  truncate px-4">
      <span
          v-if="getSearchTerm.length > 0"
          title="reuse this search term"
          @click="reuseSearchTerm()"
          class="cursor-pointer hover:underline ">
        {{getSearchTerm}}
      </span>
<!--    filler  -->
      <span
          v-if="!(getSearchTerm.length > 0)"
          class="cursor-default">
        &nbsp;
      </span>
<!---->
    </div>

    <div
        class="status col-span-3 text-right text-gray-700"
        :class="{'done': searchStore[bookProvider].getCurrentStatus() === librarySearchStatus.SEARCH_FINISHED }"
    >
      &nbsp;{{searchStore[bookProvider].getCurrentStatus()}}
    </div>

<!--  filler  -->
    <div
        v-if="searchStore[bookProvider].getCurrentStatus() !== librarySearchStatus.SEARCH_FINISHED"
        class="result-count col-span-2 text-center text-gray-700"
    >
      &nbsp;
    </div>
<!-- /filler  -->
    <div
        v-if="searchStore[bookProvider].getCurrentStatus() === librarySearchStatus.SEARCH_FINISHED"
        class="result-count col-span-2 text-center text-gray-700"
    >
      {{getSearchResultCount}}

    </div>
    <div class="text-center col-span-1 overflow-visible text-gray-700 "
         id="search-timer">{{getSearchTime}}</div>

<!--  button to close bookshelf  -->
    <div v-if="!shelfIsEmpty" title="close results" @click="closeBookShelf()"
         class="cursor-pointer col-span-2 text-right pr-2 hover:underline"
    >
      <span>[ x ]</span>
    </div>
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
  props: ['bookStore', 'searchStore', 'bookProvider', 'closeBookshelfHandler', 'shelfIsEmpty'],
  emits: ['close-bookshelf', 'reuse-search-term'],
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
      // console.log("CALCULATING COUNT", this.searchStore[this.bookProvider].getSearchResultCount())
      if (this.searchStore[this.bookProvider].getSearchResultCount() === 0) {
        return '(0 hits.)'
      } else {
        return `(${this.searchStore[this.bookProvider].getSearchResultCount()} hits.)`
      }

      // return + ' hits.';
      }
  },
  methods: {
    closeBookShelf: function() {
      console.log('emitted')
      this.$emit('close-bookshelf', true)

      // this.closeBookshelfHandler();
    },
    reuseSearchTerm: function() {
      this.$emit('reuse-search-term', this.bookProvider, this.getSearchTerm?.replace(/"/g, ''))
    }
  }
}
</script>
