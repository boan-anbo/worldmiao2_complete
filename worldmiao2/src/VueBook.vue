
<style>

.bookInfo {
  -webkit-transition: transform 0.5s ease;
}
.bookInfo.animate{
  transform: translate3d(0, -200px, 0);
  -webkit-transform: translate3d(0, -200px, 0);
  -webkit-transition: transform 0.5s ease;
}
.bookLinks {
  -webkit-transition: transform 0.5s ease;
}
.bookLinks.animate {
  transform: translate3d(0, -200ox, 0);
  -webkit-transform: translate3d(0, -200px, 0);
  -webkit-transition: transform 0.5s ease;
}
</style>

<template>

<div  @click="showInfo = !showInfo"
      style="max-width: 400px; max-height:200px; height: 200px; "
      class="overflow-hidden border"

>

  <div :class="{'animate': !showInfo}" style="max-width: 400px; max-height:200px; height: 200px"
       class="bookInfo "
  >
  <a-row>
  <a-col :span="24" class="text-base px-3 font-light text-black text-left">
    <span class="font-base">{{index + 1 + '.'}}</span><span class="ml-2">{{  book.title }}</span>
  </a-col>
  </a-row>
  <a-row type="flex" justify="center" class="text-sm my-2 truncate">
    <a-col>
      {{ book.author + ', ' }}
      {{ book.publicationYear}}{{'; ' + book.publisher}}
  </a-col>
  </a-row>
  <a-row class=" text-left text-sm overflow-ellipsis overflow-hidden ">
    <a-col class="h-full py-2 px-6 mx-4" :span="24" >
      {{book.description}}
    </a-col>
  </a-row >


  </div>

  <div  :class="{animate: !showInfo}" class="bookLinks">
      <BookAccesses :book="book" :links="state.links"/>
  </div>



</div>

</template>
<script lang="ts">
import {Book} from "@/entities/book.entity";
import {fetchAccess} from "@/functions/fetchBookAccess";
import {BookAccessState} from "@/entities/book.fetch.entity";
import {reactive} from "vue";
import BookAccesses from "@/BookAccesses.vue";

export default {
  name: 'VueBook',
  components: {BookAccesses},
  setup(props: {
    book: Book
  }) {
    // console.log("Received Book", book )
    const state = reactive({
      bookAccess: BookAccessState.IDLE,
      timer: 0,
      links: props.book.access
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
    index: Number
  },
  data() {
    return {
      showInfo: true
    }
  }

}
</script>
