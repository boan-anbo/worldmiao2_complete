<template>
  <div style="max-width: 400px; max-height:200px; height: 200px;"

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
      <span class="text-lg text-black">
    {{libraryName}}
    </span>
  </div>

      <div></div>
      <div></div>
    <div>
      <!--      search button-->
      <slot></slot>
      <!--      search button-->
    </div>
      <div></div>
  </div>
  </div>

  <div
      class="bg-gray-200 bg-opacity-25"
      :class="{
    // 'bg-gray-200': colIsEven && index % 2 === 0,
    // 'bg-white': colIsEven && index % 2 !== 0,
    // 'bg-gray-200': colIsEven && (index % 2 === 0) || !colIsEven && (index % 2 !== 0),
  // 'bg-gray-100': colIsEven,
  // 'bg-gray-300': !colIsEven

    // 'bg-white': !colIsEven && index % 2 !== 0,

  }" v-for="(book, index) in getBooks()" :key="book">

    <VueBook :book="book" :index="index" />

  </div>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import {Book, BookAccess, BookProvider, BookProviderList} from "@/entities/book.entity";
// eslint-disable-next-line no-unused-vars
import {v4} from 'uuid';
import VueBook from "@/VueBook.vue";
// eslint-disable-next-line no-unused-vars
import {LibraryProps} from "@/interfaces/LibraryProps";


// eslint-disable-next-line no-unused-vars
const faker = require('faker');
export default {
  name: 'Library',
  components: {VueBook},
  setup(props: LibraryProps) {
    const books: Book[] = [];


    console.log("Checking bookstore", props.bookStore);
    const getBooks = ():Book[] => props.bookStore[props.bookProvider].data;

    // test books
    // for (let i = 0; i < 20; i++) {
    //   const newBook = new Book(props.bookProvider, { id: v4(), idNote: 'fake ID' }, faker.lorem.sentence(12))
    //   newBook.author = faker.name.findName() + ' ' + faker.name.lastName();
    //   newBook.publicationYear = faker.date.past().getFullYear()
    //   newBook.description = faker.lorem.paragraph();
    //   newBook.access.push(new BookAccess(faker.internet.url(), 'pdf'))
    //   newBook.isbns.push(faker.finance.account())
    //   newBook.isbns.push(faker.finance.account())
    //   newBook.publisher = faker.company.companyName();
    //   books.push(newBook)
    // }
    // check current lbirary provider

    return {
      books,
      getBooks
    }
  },
  props: {
    libraryName: String,
    bookProvider: BookProvider,
    colIsEven: Boolean,
    bookStore:  Object
  },
  data() {
    return {
    }
  },
  method() {

  },


}
</script>
