<template>

  <div class="grid grid-cols-8 text-xs pb-1">
    <div class="text-center col-span-8 pb-2">&nbsp;{{getSearchTerm}}</div>
    <div class="status col-span-3 text-right">
      &nbsp;{{searchStore[bookProvider].getCurrentStatus()}}
    </div>

<!--  filler  -->
    <div
        v-if="searchStore[bookProvider].getCurrentStatus() !== librarySearchStatus.SEARCH_FINISHED"
        class="result-count col-span-2 text-center"
    >
      &nbsp;
    </div>
<!--  filler  -->


    <div
        v-if="searchStore[bookProvider].getCurrentStatus() === librarySearchStatus.SEARCH_FINISHED"
         class="result-count col-span-2 text-center"
    >
        {{getSearchResultCount}}

    </div>
    <div class="text-center col-span-1 overflow-visible " id="search-timer">{{getSearchTime}}</div>

    <div v-if="!shelfIsEmpty" title="close results" @click="closeBookShelf()"
         class="cursor-pointer col-span-2 text-right pr-2 hover:underline"
    >[ x ]</div>
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
  emits: ['close-bookshelf'],
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
    }
  }
}
</script>
