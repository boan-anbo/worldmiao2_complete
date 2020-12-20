<style>
.displaygrid::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
<template>


    <div style="height:200px; background-color: #fffffc !important;"
         class="grid  grid-cols-12 content-between cursor-pointer">

      <div :title="book.title" id="access-header" style="max-height: 60px; min-height: 60px"  class=" overflow-y-hidden col-span-12 pt-4 px-4">
        <span @click.stop class="cursor-text">{{book.title}}</span></div>

    <div class="displaygrid space-y-2 col-span-12 content-between overflow-y-scroll  grid-cols-12">
      <!--   Display Panel for direct links. -->


      <!--  show fetching    -->
      <div v-if="fetchStatus === 'FETCHING' || fetchStatus === 'QUEUING'"
           class="text-xs col-span-12 cursor-wait "

      >
        <span >{{getStatusString}}</span>
      </div>

      <!--   show no result   -->

      <div v-if="(fetchStatus === 'FETCHED' || fetchStatus === 'ERROR') && accesses?.length === 0 "
           class="c text-xs col-span-12 cursor-not-allowed h-full"
      >
        <span >no links found.</span>
      </div>

      <!-- show results -->
<!--      <div v-for="(access, index) in accesses" :key="index" class="col-span-12 grid grid-cols-12 pl-2 ">-->
        <div v-for="(access, index) in accesses" :key="index" class="col-span-12 grid grid-cols-12 pl-2 ">

          <div
              :title="`${access.type}. some might require login`"
              id="data-access-type" v-if="access.type"
              class="
              col-span-3
              text-xs
              access-type
              truncate
              text-right
              cursor-pointer
              "
          >
            {{index + 1}}: {{getAccessTypeString(access.type)}}:
          </div>
        <div
              :title="access.link"
              class="text-xs   truncate pl-2 pr-4 col-span-9  text-center">
          <div  class="truncate" v-if="access.type !== dataType.DATABASE">
            <span @click.stop.prevent="openWindow(access.link)  " class="cursor-pointer hover:underline">{{access.link}}</span>
          </div>
          <div class="truncate " v-if="access.type === dataType.DATABASE">
            <span @click.stop.prevent="openWindow(access.link)  " class="cursor-pointer hover:underline">{{access.name}}</span>
          </div>
        </div>

      </div>



    </div>
    <div id="access-footer" class=" text-gray-400 col-span-12 pb-2 text-xs"><span>
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
          string = 'database'
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
        case BookAccessFetchingState.QUEUING:
          string = 'queuing ..'
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
