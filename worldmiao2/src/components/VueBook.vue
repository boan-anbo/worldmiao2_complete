
<style>

#library-name {
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
</style>

<template>
<div
      style="max-width: 100%; min-width:400px; max-height:200px; height: 200px; "
      class="overflow-hidden border"

>

  <div
      style="min-height: 200px; background-color: #5D8D89;"
      :class="{'moveUpOutOfView': !bookCoverShown}"
      class="bookCover font-bold "

  >
    Cover
<!--    {{// JSON.stringify(book)}}-->
    <p id="library-name" class="text-lg">{{libraryName}}</p>


  </div>

<!--  Book info card-->
  <div

      @click="this.state.showInfo = !this.state.showInfo"
      style="min-height: 200px;"
      :class="{
        'moveUpOutOfView': !this.state.showInfo,
      'moveIntoViewFromBelow': !bookCoverShown
      }" class="bookInfo "
  >

<!--    Details -->
<a-row class="bg-red-200">
<a-col :span="24" class="text-base pl-6 pr-4 font-light text-black text-left">
  <span class="font-base">{{index + 1 + '.'}}</span><span class="ml-2">{{  book.title }}</span>
</a-col>
</a-row>

<!--   Author, Publication, Publisher -->
<a-row type="flex" justify="center" class="text-sm my-2 truncate">
  <a-col>
    {{ book.author + ', ' }}
    {{ book.publicationYear}}{{'; ' + book.publisher}}
</a-col>
</a-row>

<!-- Description
-->
<a-row class=" text-left text-sm overflow-ellipsis overflow-hidden ">
  <a-col class="h-full py-2 px-6 mx-4" :span="24" >
    {{book.description}}
  </a-col>
</a-row >
</div>

  <!--    Book Link-->

  <div  @click="this.state.showInfo = !this.state.showInfo"
        :class="{'moveIntoViewFromBelow': !this.state.showInfo && !bookCoverShown }" class="bookLinks">
<BookAccesses :book="book" :links="state.links"/>
  </div>



</div>

</template>
<script lang="ts">
import {Book} from "@/entities/book.entity";
import {fetchAccess} from "@/functions/fetchBookAccess";
import {BookAccessState} from "@/entities/book.fetch.entity";
import {reactive} from "vue";
import BookAccesses from "@/components/BookAccesses.vue";


export default {
  name: 'VueBook',
  components: {BookAccesses},
  setup(props: {book: Book}) {
    // console.log("Received Book", book )
    const state = reactive({
      bookAccess: BookAccessState.IDLE,
      timer: 0,
      links: props.book?.access,
      showInfo: true
    })

    const fetch = async (test: string) => {
      state.timer = 0;
      state.bookAccess = BookAccessState.LOADING
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

    }
  },
  watch: {
    book: function() {
      // if book is loaded, reset showInfo To True
      console.log("FOUND BOOK CHANGED")
      this.state.showInfo = true
    }
  }


}
</script>
