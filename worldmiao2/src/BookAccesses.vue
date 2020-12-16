<template>
  <div style="height:200px" class="bg-white">

    <a-row class="py-2">

      <a-col :span="8" >
      </a-col>

      <a-col :span="8">
      <span
          class="
          cursor-pointer
          font-semibold
          hover:underline
          text-center
          font-light
          my-2
"
          @click="fetch('feafweaf')">
        fetch links
      </span>

      </a-col>

      <a-col :span="8"
             class="text-left">
        <span class=" text-gray-500">
         {{ statusLabel()}}
      </span>
      </a-col>
    </a-row>

  <a-row :span="24" v-for="(link, index) in props.links" :key="index">
<a-col :span="2"></a-col>
    <a-col :span="20" class="text-center border-t border-b">
      <span class="hover:underline cursor-pointer font-semibold">{{link.link}}</span>
      <span class="ml-2 lowercase">{{'(' + link.type + ')'}}</span>

    </a-col>
    <a-col :span="2"></a-col>

  </a-row>
  </div>
</template>
<script lang="ts">



// eslint-disable-next-line no-unused-vars
import {Book, BookAccess} from "@/entities/book.entity";
import {BookAccessState} from "@/entities/book.fetch.entity";
import {reactive} from "vue";

export default {
  name: 'BookAccesses',
  setup(props: {links: BookAccess[], book: Book}) {

    const state = reactive({
      bookAccess: BookAccessState.IDLE,
      timer: 0,
      links: props.book.access
    })

    const statusLabel = () => {
      switch(state.bookAccess) {
        case BookAccessState.ERROR:
          return '(error. retry again later.)'
        case BookAccessState.FETCHED:
          return '(done.)'
        case BookAccessState.IDLE:
          return ''
        case BookAccessState.LOADING:
          return '(loading... ' + (state.timer > 0 ? state.timer + 's.)' : ')')
      }
    }

    const isLoadingState = () => {
      return state.bookAccess === BookAccessState.LOADING || state.bookAccess === BookAccessState.ERROR

    }

    return {
      props,
      statusLabel,
      isLoadingState
    }
  },
  props: {
    links: Array,
    book: Book
  }
}
</script>
