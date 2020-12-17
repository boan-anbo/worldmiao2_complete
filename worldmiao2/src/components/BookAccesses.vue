<template>


    <div style="height:200px"  class="grid grid-cols-1 bg-red-200 content-between">

      <div>1</div>
    <div id="displaygrid" class="bg-gray-100">
      <!--   Display Panel for direct links. -->

      <span v-if="fetchStatus === 'FETCHING'">{{getStatusString}}</span>
      <div >
        <div v-for="(access, index) in accesses" :key="index">
          <div v-if="access.type !== dataType.DATABASE">
          <span
              class=" cursor-pointer font-semibold"
              @click.stop.prevent="openWindow(access.link)">
            <span class="hover:underline">
              {{access.link}}
            </span>
            <span class="ml-2 lowercase" v-if="book.format">{{'(' + book.format + ')'}}</span>

          </span>
      </div>
      </div>
      </div>

    </div>
      <div>1</div>

    </div>









<!--    Display Panel for Databases -->
    <div v-if="dataType.DATABASE">
      <a-row :span="24" v-for="(access, index) in book?.access" :key="index">
        <a-col :span="2">

        </a-col>

        <a-col :span="20" class="text-center border-t border-b">
          <span
              class=" cursor-pointer font-semibold"
              @click.stop.prevent="openWindow(access.link)">
            <span class="hover:underline">
              {{access.link}}
            </span>
            <span class="ml-2 lowercase" v-if="book.format">{{'(' + book.format + ')'}}</span>

          </span>

        </a-col>

        <a-col :span="2"></a-col>


      </a-row>
    </div>

</template>
<script lang="js">



// eslint-disable-next-line no-unused-vars
import {Book, BookAccess, BookAccessType} from "@/entities/book.entity";
import {BookAccessFetchingState} from "@/entities/book.fetch.entity";

export default {
  name: 'BookAccesses',
  setup() {



    // const isLoadingState = () => {
    //   return state.bookAccess === BookAccessState.LOADING || state.bookAccess === BookAccessState.ERROR
    //
    // }

    return {
      // props,
      // statusLabel,
      // isLoadingState
    }
  },
  props: {
    links: Array,
    book: Book,
    accesses: Array,
    fetchStatus: BookAccessFetchingState
  },
  methods: {
    openWindow: (link) => window.open(link)
  },
  computed: {
    getStatusString: function() {
      let string = ''
      switch (this.fetchStatus) {
        case BookAccessFetchingState.FETCHING:
          string = 'fetching bitch'
          break
      }
      return string;
    }
  },
  data() {
    return {
      dataType: BookAccessType
    }
  }
}
</script>
