
<style>

.description::-webkit-scrollbar {
  display: none;

}
.description {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.library-name-cover {
  color: #3B5957;
  background-color: #5D8D89;
  text-shadow: 0px 1px 0px rgba(255,255,255,.3), 0px -1px 0px rgba(0,0,0,.7);
  font-size: xx-large;
}

.bookCover {
  -webkit-transition: transform 0.5s ease;
  z-index: 9999;
}
.bookCover.moveUpOutOfView{
  transform: translate3d(0, -400px, 0);
  -webkit-transform: translate3d(0, -400px, 0);
  -webkit-transition: transform 0.5s ease;
}


.bookInfo {
  -webkit-transition: transform 0.5s ease;
}
.bookInfo.moveIntoViewFromBelow {
  transform: translate3d(0, -200px, 0);
  -webkit-transform: translate3d(0, -200px, 0);
  -webkit-transition: transform 0.5s ease;
}
.bookInfo.moveUpOutOfView{
  transform: translate3d(0, -400px, 0);
  -webkit-transform: translate3d(0, -400px, 0);
  -webkit-transition: transform 0.5s ease;
}

.bookLinks {

  -webkit-transition: transform 0.5s ease;
}
.bookLinks.moveIntoViewFromBelow {
  transform: translate3d(0, -400ox, 0);
  -webkit-transform: translate3d(0, -400px, 0);
  -webkit-transition: transform 0.5s ease;
}
.coverBgColor {
  background-color: #5D8D89;
}
.bookInfoBgColor {
  background-color: #b7d4d2;
}
.bookLinksBgColor {
 background-color: #f3f3f3;
}
</style>

<template>
<!--  the back panel 's color is that of the cover so when the cover is lift there is no white color in the back-->
<div
      style="max-width: 100%; min-width:200px; max-height:200px; height: 200px;   background-color: #b7d4d2;"
      class="overflow-hidden border "
>

<!-- box cover -->
  <div
      style="min-height: 200px; height: 200px; background-color: #5D8D89;"
      :class="{'moveUpOutOfView': !bookCoverShown}"
      class="bookCover font-bold grid grid-cols-1 content-between"

  >
    <div class="cover-header"></div>

    <div class="library-name-cover cover-content text-lg">{{libraryName}}</div>
    <div class="cover-footer"></div>

  </div>

<!--  Book info card-->


  <div

      @click="this.toggleBookInfo()"
      style="min-height: 200px; background-color: #b7d4d2"
      :class="{
        'moveUpOutOfView': !this.state.showInfo,
      'moveIntoViewFromBelow': !bookCoverShown
      }"
      class="bookInfo grid grid-cols-1 content-between cursor-pointer"
  >

<!--    Details -->

<!--   Title -->
    <div style="max-height: 60px; min-height: 60px"
         :title="book.title"
         class="
         overflow-truncate
         overflow-y-hidden

         book-info-title
         text-base
         pl-8  pt-4 pr-6  text-black text-left ">
      <span class="font-base">{{index + 1 + '.'}}</span>
      <span class="ml-2 cursor-text" @click.stop>{{  book.title }}</span>
    </div>

<!--  author, year, publisher  -->
    <div class="book-info-description grid grid-col-1">
          <div class="text-xs my px-4 truncate my-1  text-gray-600">

            <span v-if="book?.author">{{ book?.author + ', ' }}</span>
            <span v-if="book?.publicationYear !== 0">{{ book?.publicationYear}}</span>
            <span v-if="book?.publisher">{{'; ' + book?.publisher}}</span>

          </div>

<!--      description -->
      <div
          style="
          max-height: 90px;
          text-overflow: ellipsis;
          word-wrap: break-word;"


          class="description text-left text-xs  py-2 px-6 mx-4 overflow-y-scroll select-none"
      >

        {{book.description}}

      </div >

    </div>
    <div class="boot-info-footer pb-2
    text-gray-500
    text-xs">{{libraryName}}</div>

  <!--  Title -->

<!--   Author, Publication, Publisher -->


<!-- Description
-->

</div>

  <!--    Book Link-->

<div  @click="toggleBookInfo()"
:class="{'moveIntoViewFromBelow': !this.state.showInfo && !bookCoverShown }"
      style="background-color: #b7d4d2;"
      class="bookLinks ">

<BookAccesses

    :book="book"
    :fetchStatus="this.fetchStatus"
    :accesses="accesses"
    :libraryName="libraryName"
    :links="state.links"/>

</div>

</div>

</template>
<script lang="js">
import {Book, } from "@/entities/book.entity";
import {fetchAccess} from "@/functions/fetchBookAccess";
import {BookAccessFetchingState} from "@/entities/book.fetch.entity";
import {reactive} from "vue";
import BookAccesses from "@/components/BookAccesses.vue";
// eslint-disable-next-line no-unused-vars
import {ScrapingCenterSuccessResponse} from "@/interfaces/ScrapingCenterSuccessResponse";


export default {
  name: 'VueBook',
  components: {BookAccesses},
  emits: ['fetch-request'],
  setup(props) {
    // console.log("Received Book", book )
    const state = reactive({
      bookAccess: BookAccessFetchingState.IDLE,
      timer: 0,
      links: props.book?.access,
      showInfo: true
    })

    const fetch = async (test) => {
      state.timer = 0;
      state.bookAccess = BookAccessFetchingState.FETCHING
      fetchAccess(test, state)
    }

    return {
      fetch,
      state,

    }
  },
  props: {
    book: Book,
    index: Number,
    bookCoverShown: Boolean,
    libraryName: String,
    fetchResultRepository: Object
  },
  data() {
    return {
      accesses: [
      ],
      fetchStatus: BookAccessFetchingState.IDLE,
      fetchTimer: 0,
      fetchResultRepositorySub: undefined
    }
  },

  methods: {
    resetAllProperties() {
      this.fetchStatus.BookAccessFetchingState.IDLE
    },
    hasNeedToFetch() {
      return this.accesses.length === 0;
    }
    ,
    onFetchAccess: async function (uniqueId, provider) {
      if (!uniqueId || !provider) {
        throw new Error('invalid fetch')
      }
      if (!this.hasNeedToFetch())
      {
        console.log('no need to fetch has ', this.accesses.length)
        return
      }

      console.log('need to fetch check', this.hasNeedToFetch())
      console.log("Fetch Access")


      this.makeFetchRequest(uniqueId, provider)
    },
    makeFetchRequest(index, uniqueId, bookId) {
      this.fetchStatus = BookAccessFetchingState.QUEUING
      this.$emit('fetch-request', { index, uniqueId, bookId })
    },
    // makeFetchRequest: async function(uniqueId, provider) {
    //
    //   // const url = './api/scraper/access'
    //
    //   const url = 'http://localhost:9000/scraper/access';
    //
    //   console.log("Posting your request for ", provider, 'for to fetch access for ', uniqueId, " to", url)
    //   // update search status
    //
    //   this.fetchStatus = BookAccessFetchingState.FETCHING
    //   // sending http request
    //   const payload = {uniqueId: uniqueId
    //     , provider: provider}
    //   console.log('payload', payload)
    //   const res = await this.axios.post(url, payload)
    //   console.log("Http Response", res)
    //   const {data} = res
    //
    //
    //   if (!data) {
    //     this.fetchStatus = BookAccessFetchingState.ERROR
    //   }
    //
    //   console.log(`Received Response From Server ${provider}, for for access fetch id ${uniqueId}, data:`, data)
    //
    //   // check if the request is still needed to prevent data racing. that's the last request hasn't been canceld but new book is already loded. then the fetching state should be IDLE. So only load the previously fetch response if the state is still 'fetching'.
    //   if (this.fetchStatus === BookAccessFetchingState.FETCHING) {
    //   this.fetchStatus = BookAccessFetchingState.FETCHED;
    //   console.log('fetched')
    //
    //   this.accesses = data.data;
    //   }
    //
    // },
    toggleBookInfo: function() {
      // switch to the other view
      this.state.showInfo = !this.state.showInfo
      // is the view that is switched to is links and the state is IDLE, start fetching
      if (!this.state.showInfo && this.fetchStatus === BookAccessFetchingState.IDLE) {
        // use book's unique id to fetch access
        // this.onFetchAccess(this.book.uniqueIdentifier.id, this.book.provider)
        this.makeFetchRequest(this.index, this.book.uniqueIdentifier.id, this.book.id)
      }

}
  },
  mounted() {
    // function to receive fetched access or fetch status update
    this.fetchResultRepositorySub = this.fetchResultRepository.subscribe(({index, result, operation, status}) => {
      if (index === this.index) {

        switch (operation) {
          case 'status':
            this.fetchStatus = status
            break
          case 'result':
            console.log('Child', this.index, 'received repo update', result)
            this.fetchStatus = BookAccessFetchingState.FETCHED;
            if (result.data?.data) {
              this.accesses = result.data.data;
            }
            break
        }

      }
    })
  },
  unmounted() {
    this.fetchResultRepositorySub?.unsubscribe();
  },

  watch: {
    book: function() {
      // if book is loaded, reset showInfo To True
      console.log("FOUND BOOK CHANGED", this.book)
      this.state.showInfo = true
      // load book access and reset loading state
      this.accesses = this.book.access
      this.fetchStatus = BookAccessFetchingState.IDLE
    }
  }


}
</script>
