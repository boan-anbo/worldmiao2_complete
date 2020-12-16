<template>
  <span>{{searchStore[bookProvider].getSearchedTerm()}}</span><span id="status">{{searchStore[bookProvider].getCurrentStatus()}}</span><span id="search-timer">{{searchStore[bookProvider].getTimerValue()}}</span>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import {BookProvider} from "@/entities/book.entity";
// eslint-disable-next-line no-unused-vars
import {SearchStore} from "@/entities/app.entity";
// eslint-disable-next-line no-unused-vars
import {BookStore} from "@/interfaces/AppProps";

export default {
  name: 'FetchStatus',
  props: ['bookStore', 'searchStore', 'bookProvider'],
  setup(props: {bookStore: BookStore, searchStore: SearchStore, bookProvider: BookProvider}) {
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
  computed: {



  },
  method: {

  }
}
</script>
