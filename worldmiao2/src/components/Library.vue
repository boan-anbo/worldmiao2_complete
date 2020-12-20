<template>
  <div style="max-width: 100%; max-height:200px; height: 200px;"

        class="search-panel border grid grid-cols-1 content-between"
       >



<!--    Test load books-->
<!--    <button  @click="loadBooks">Load BOoks</button>-->
      <div class="search-header  mt-4 ">
        <span @click.stop.prevent="openLink(libraryUrl)" class="text-lg hover:underline text-black cursor-pointer" :title="libraryUrl">
    {{libraryName}}
      </span>
      </div>

    <div @click="showBoxes">
      <!--      search button-->
<!--      <button @click="showBookCover">Show Cover</button>-->
<!--      <button @click="hideBookCover">Hide Cover</button>-->
      <slot name="search-box"  ></slot>

      <!--      search button-->

    </div>


      <div>
        <slot
              :closeBookshelfHandler="hideBoxes"
              :shelfIsEmpty="shelfIsEmpty()"
              v-if="searchStatusShown" name="search-status"> </slot>
        <span v-if="!searchStatusShown" class="white">&nbsp;</span>
      </div>

  </div>

  <div

      id="book-shelf"
      class="
      bg-gray-200
      bg-opacity-25
      overflow-hidden
      " v-for="(bookShelfBox, index) in bookShelfRef[bookProvider]" :key="index">

    <VueBook
        class="bookBox"
        :class="{'moveUpOutOfView': !boxesShown}"
        :bookCoverShown="bookShelfBox.bookCoverShown"
        :book="bookShelfBox.book"
        :library-name="libraryName"
        :index="index"
    />

  </div>

</template>

<script >
// eslint-disable-next-line no-unused-vars
import {Book, BookAccess, BookAccessType, BookProvider, BookProviderList} from "@/entities/book.entity";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import {LibraryProps} from "@/interfaces/LibraryProps";
import VueBook from "@/components/VueBook.vue";
import {ref} from "vue";
// eslint-disable-next-line no-unused-vars
import {BookShelf, BookShelfBox} from "@/entities/app.entity";


// eslint-disable-next-line no-unused-vars
// const faker = require('faker');
export default {
  name: 'Library',
  components: {VueBook},
  setup(props) {


    // console.log("Checking bookstore", props.bookStore);


    // type: Book [];
    let books = ref(new Array(20));

    // assembly book shelf
    // type: BookShelf
    const bookShelf = {}

    const bookShelfRef = ref(bookShelf)


    const fillBookShelfWithEmptyBoxes = () => {
      console.log('filling empty boxes')
      for (let i = 0; i < BookProviderList.length; i ++) {
        // give each provider a shelf.
        let bookShelfBoxes = [];
        for (let i = 0; i < 20; i++) {
          bookShelfBoxes.push(
            // give each shelf box an empty book and a book cover toggle.
            new BookShelfBox()
          )
        }
        bookShelfRef.value[BookProviderList[i].providerEnum] = bookShelfBoxes
      }
    }







    // eslint-disable-next-line no-unused-vars
    const showOneBookCover = (index) => {
      setTimeout(() => getThisShelfToSet()[index].bookCoverShown = true, index * 80)
    }

    const hideOneBookCover = (index) => {
      setTimeout(() => getThisShelfToSet()[index].bookCoverShown = false, index * 80)
    }

    const getThisShelfToSet = () => {
      return bookShelfRef.value[props.bookProvider]
    }


    const unshelfBooks =() => {
      bookShelfRef.value[props.bookProvider] = []
    }

    const shelfIsEmpty = () => {
      return bookShelfRef.value[props.bookProvider]?.length === 0;
    }

    const upshelfBooks = (books) => {
      fillBookShelfWithEmptyBoxes()
      if (books?.length > 20) {
        books = books.slice(0, 20);
      }
      books.forEach((bookToLoad, bookIndex) => {
        getThisShelfToSet()[bookIndex].book = bookToLoad;
        console.log("Old Book: ", getThisShelfToSet()[bookIndex].book, "new book", bookToLoad)
        hideOneBookCover(bookIndex);
      }
      )
    }

    // const bookCoverShown = ref(true);

    const showAllBookCover = () => {


      for (let i = 0; i < bookShelfRef.value[props.bookProvider].length; i++) {
        showOneBookCover(i)

      }
    }


    const hideAllBookCover = () => {
      for (let i = 0; i < bookShelfRef.value[props.bookProvider].length; i++) {
       hideOneBookCover(i)

      }

    }



    // const  loadTestBooks = () => {
    //   const fakeBooks = []
    //   for (let i = 0; i < 15; i++) {
    //     const newBook = new Book(props.bookProvider, {id: '1', idNote: 'fake ID'}, faker.lorem.sentence(12))
    //     newBook.author = faker.name.findName() + ' ' + faker.name.lastName();
    //     newBook.publicationYear = faker.date.past().getFullYear()
    //     newBook.description = faker.lorem.paragraph();
    //     newBook.access.push(new BookAccess(faker.internet.url(), BookAccessType.DOWNLOAD))
    //     newBook.isbns.push(faker.finance.account())
    //     newBook.isbns.push(faker.finance.account())
    //     newBook.publisher = faker.company.companyName();
    //     newBook.format = 'PDF'
    //     fakeBooks.push(newBook)
    //   }
    //   upshelfBooks(fakeBooks)
    // }
    //
    // loadTestBooks()

    return {
      books,
      // loadBooks: loadTestBooks,
      showBookCover: showAllBookCover,
      hideBookCover: hideAllBookCover,
      bookShelfRef,
      upshelfBooks,
      unshelfBooks,
      getThisShelf: getThisShelfToSet,
      fillBookShelfWithEmptyBoxes,
      shelfIsEmpty,
    }
  },
  props: {
    libraryName: String,
    bookProvider: BookProvider,
    colIsEven: Boolean,
    bookStore: Object,
    libraryUrl: String
  },
  data() {
    return {
      boxesShown: false,
      searchStatusShown: false,
    }
  },
  methods: {
    showBoxes: function() {
      if (!this.boxesShown) {
        setTimeout(() => this.boxesShown = true, 0)
        setTimeout(() => this.searchStatusShown = true, 0.8)
        this.fillBookShelfWithEmptyBoxes()


      }
    },
    hideBoxes: function() {
      console.log('called')
      this.unshelfBooks();
      this.boxesShown = false
    },
    openLink: function(url) {
      if (url?.length < 1) return
      window.open(url)
    }


  },
  watch: {
    bookStore: function() {
      console.log("Found Book Store Change", this.bookStore)
      if (this.bookStore !== undefined) {
        this.upshelfBooks(this.bookStore.data)
      }
    }
  }



}
</script>
<style>
#back-panel {
  z-index: 9999
}
#book-shelf {
  z-index: 9999
}
.bookBox {
  -webkit-transition: transform 0.3s ease;
  z-index: 0;
}
.bookBox.moveUpOutOfView{
  transform: translate3d(0, -400px, 0);
  -webkit-transform: translate3d(0, -400px, 0);
  -webkit-transition: transform 0.3s ease;
  z-index: 0
}
</style>
