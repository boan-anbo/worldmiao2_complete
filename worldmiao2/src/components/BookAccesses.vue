<template>


    <div style="height:200px; background-color: #f3f3f3 !important;" class="grid  grid-cols-12 content-between">

      <div id="access-header" class="col-span-12 pt-4">{{book.title}}</div>

    <div id="displaygrid" class="overflow-scroll space-y-2 col-span-12 content-between  grid-cols-12">
      <!--   Display Panel for direct links. -->

      <div v-if="fetchStatus === 'FETCHING'"
           class="c text-xs col-span-12 cursor-wait h-full"
      >
        <span >{{getStatusString}}</span>
      </div>


      <div v-for="(access, index) in accesses" :key="index" class="col-span-12 grid grid-cols-12 pl-2 overflow-scroll">

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
        <div  @click.stop.prevent="openWindow(access.link)  "
              :title="access.link"
             class="text-xs hover:underline cursor-pointer truncate pl-2 pr-4 col-span-9  text-center">
          <div class="truncate" v-if="access.type !== dataType.DATABASE">{{access.link}}</div>
          <div class="truncate" v-if="access.type === dataType.DATABASE">{{access.name}}</div>
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
