<template>
  <div style="max-width: 100%; max-height:200px; height: 200px;"

        class="border m-auto"
       :class="{
    // 'bg-gray-300': colIsEven,
    //   'bg-gray-100': !colIsEven
       }"

  >

    <div class="grid grid-cols-1 gap-4">

    <div></div>
    <div></div>
    <div></div>
    <div></div>
  <div>
    <button @click="loadBooks">Load BOoks</button>
      <span class="text-lg text-black">
    {{libraryName}}

    </span>
  </div>

      <div></div>
      <div></div>
    <div>
      <!--      search button-->
      <button @click="showBookCover">Show Cover</button>
      <button @click="hideBookCover">Hide Cover</button>
      <slot name="search-box"></slot>

      <!--      search button-->
    </div>
      <div>
        <slot name="fetch-status"> </slot>
      </div>
  </div>
  </div>

  <div class="bg-gray-200 bg-opacity-25" v-for="(bookShelfBox, index) in bookShelfRef[bookProvider]" :key="index">

    <VueBook
        :bookCoverShown="bookShelfBox.bookCoverShown"
        :book="bookShelfBox.book"
        :library-name="libraryName"
        :index="index"


    />

  </div>
</template>
<script lang="ts">
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
const faker = require('faker');
export default {
  name: 'Library',
  components: {VueBook},
  setup(props: LibraryProps) {


    console.log("Checking bookstore", props.bookStore);


    let books = ref(new Array(20) as Book[])

    // assembly book shelf
    const bookShelf = {} as BookShelf

    for (let i = 0; i < BookProviderList.length; i ++) {
      // give each provider a shelf.
      let bookShelfBoxes = [];
      for (let i = 0; i < 20; i++) {
        bookShelfBoxes.push(
          // give each shelf box an empty book and a book cover toggle.
          new BookShelfBox()
        )
      }
      bookShelf[BookProviderList[i].providerEnum] = bookShelfBoxes
    }

    const bookShelfRef = ref(bookShelf)

    // eslint-disable-next-line no-unused-vars
    const showOneBookCover = (index: number) => {
      setTimeout(() => getThisShelfToSet()[index].bookCoverShown = true, index * 80)
    }

    const hideOneBookCover = (index: number) => {
      setTimeout(() => getThisShelfToSet()[index].bookCoverShown = false, index * 80)
    }

    const getThisShelfToSet = () => {
      return bookShelfRef.value[props.bookProvider]
    }

    const upshelfBooks = (books: Book[]) => {
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



    const  loadTestBooks = () => {
      const fakeBooks = []
      for (let i = 0; i < 15; i++) {
        const newBook = new Book(props.bookProvider, {id: '1', idNote: 'fake ID'}, faker.lorem.sentence(12))
        newBook.author = faker.name.findName() + ' ' + faker.name.lastName();
        newBook.publicationYear = faker.date.past().getFullYear()
        newBook.description = faker.lorem.paragraph();
        newBook.access.push(new BookAccess(faker.internet.url(), BookAccessType.DOWNLOAD))
        newBook.isbns.push(faker.finance.account())
        newBook.isbns.push(faker.finance.account())
        newBook.publisher = faker.company.companyName();
        newBook.format = 'PDF'
        fakeBooks.push(newBook)
      }
      upshelfBooks(fakeBooks)
    }

    loadTestBooks()

    return {
      books,
      loadBooks: loadTestBooks,
      showBookCover: showAllBookCover,
      hideBookCover: hideAllBookCover,
      bookShelfRef,
      upshelfBooks,
      getThisShelf: getThisShelfToSet
    }
  },
  props: {
    libraryName: String,
    bookProvider: BookProvider,
    colIsEven: Boolean,
    bookStore: Object
  },
  methods: {

  }



}
</script>
