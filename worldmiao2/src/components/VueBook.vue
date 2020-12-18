
<style>

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
      style="max-width: 100%; min-width:400px; max-height:200px; height: 200px;   background-color: #b7d4d2;"
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
      class="bookInfo grid grid-cols-1 content-between"
  >

<!--    Details -->

    <div class="book-info-title text-base pl-6 pr-4 font-light text-black text-left">
      <span class="font-base">{{index + 1 + '.'}}</span><span class="ml-2">{{  book.title }}</span>
    </div>
    <div class="book-info-description grid grid-col-1">
          <div class="text-sm my truncate">

          {{ book.author + ', ' }}
              {{ book.publicationYear}}{{'; ' + book.publisher}}

          </div>
      <div
          style="max-height: 100px; text-overflow: ellipsis; word-wrap: break-word; overflow: hidden;"
          class="text-left text-xs  py-2 px-6 mx-4 ">

        {{book.description}}

      </div >

    </div>
    <div class="boot-info-footer text-xs">{{libraryName}}</div>

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
    libraryName: String
  },
  data() {
    return {
      accesses: [
      ],
      fetchStatus: BookAccessFetchingState.IDLE,
      fetchTimer: 0
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
    makeFetchRequest: async function(uniqueId, provider) {
      // setTimeout(() =>
      // {
      //   this.accesses = [
      //     new BookAccess('LinkName', BookAccessType.BORROW),
      //     new BookAccess('proquest.com', BookAccessType.DATABASE, 'Proquest Database'),
      //   ]
      const url = './api/scraper/access'
      console.log("Posting your request for ", provider, 'for to fetch access for ', uniqueId, " to", url)
      // update search status

      this.fetchStatus = BookAccessFetchingState.FETCHING
      // sending http request
      const payload = {uniqueId: uniqueId
        , provider: provider}
      console.log('payload', payload)
      const res = await this.axios.post(url, payload)
      console.log("Http Response", res)
      const {data} = res


      if (!data) {
        this.fetchStatus = BookAccessFetchingState.ERROR
      }

      console.log(`Received Response From Server ${provider}, for for access fetch id ${uniqueId}, data:`, data)

      this.fetchStatus = BookAccessFetchingState.FETCHED;
      console.log('fetched')
      this.accesses = data.data;

    },
    toggleBookInfo: function() {
      this.state.showInfo = !this.state.showInfo
      if (!this.state.showInfo && this.fetchStatus === BookAccessFetchingState.IDLE) {
        // use book's unique id to fetch access
        this.onFetchAccess(this.book.uniqueIdentifier.id, this.book.provider)
      }

}
  },
  watch: {
    book: function() {
      // if book is loaded, reset showInfo To True
      console.log("FOUND BOOK CHANGED")
      this.state.showInfo = true
      // load book access
      this.accesses = this.book.access
    }
  }


}
</script>
