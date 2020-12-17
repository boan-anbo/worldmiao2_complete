<template>


    <div style="height:200px; background-color: #f3f3f3 !important;" class="grid  grid-cols-12 content-between">

      <div id="access-header" class="col-span-12">{{book.title}}</div>
    <div id="displaygrid" class=" col-span-12 grid-cols-12">
      <!--   Display Panel for direct links. -->
      <div v-if="fetchStatus === 'FETCHING'" class="col-span-12">
      <span >{{getStatusString}}</span>
      </div>
      <div v-for="(access, index) in accesses" :key="index" class="col-span-12 grid grid-cols-12">

          <div id="data-access-type" v-if="access.type" class="col-span-3 text-sm access-type text-right">
            {{getAccessTypeString(access.type)}}:
          </div>
          <div
              class=" cursor-pointer truncate px-4 font-light col-span-9  text-left"
              @click.stop.prevent="openWindow(access.link)">
            <span class="hover:underline">
              <span v-if="access.type !== dataType.DATABASE">{{access.link}}</span>
              <span v-if="access.type === dataType.DATABASE">{{access.name}}</span>
          </span>
<!--            <span class="ml-2 lowercase" v-if="book.format">{{'(' + book.format + ')'}}</span>-->
          </div>



      </div>



    </div>
      <div id="access-footer" class="col-span-12  text-xs"><span>
              {{libraryName}}
            </span></div>

    </div>


</template>
<script lang="js">



// eslint-disable-next-line no-unused-vars
import {Book, BookAccess, BookAccessType, BookDataType} from "@/entities/book.entity";
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
    fetchStatus: BookAccessFetchingState,
    libraryName: String
  },
  methods: {
    openWindow: (link) => window.open(link),
    getAccessTypeString: function(accessType) {
      if (!accessType) return;
      let string = ''
      switch (accessType) {
        case BookAccessType.DATABASE:
          string = '(login) database'
          break;
        default:
          string = accessType.toLowerCase();
          break;
      }
      return string;
    }
  },
  computed: {
    getStatusString: function() {
      let string = ''
      switch (this.fetchStatus) {
        case BookAccessFetchingState.FETCHING:
          string = 'fetching links ...'
          break
      }
      return string;
    },
  },
  data() {
    return {
      dataType: BookAccessType
    }
  }
}
</script>
