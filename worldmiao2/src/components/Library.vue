<template>
  <div style="max-width: 100%; max-height:200px; height: 200px;"

        class="search-panel border grid grid-cols-1 content-between"
       >



<!--    Test load books-->
<!--    <button  @click="loadBooks">Load BOoks</button>-->
      <div class="search-header  mt-4 ">
        <span @click.stop.prevent="openLink(libraryUrl)"
              class="text-lg  text-black "

              style="color: #668885"
        >
          <span class="hover:underline cursor-pointer" :title="libraryUrl">{{libraryName}} </span>
<!--          Maintainance notice -->
        <p v-if="beingMaintained !== null" class="hover:no-underline text-xs text-gray-600">({{beingMaintained}})</p>

<!--         holdings count -->
          <p class="hover:no-underline text-xs cursor-default text-gray-600">
            <span v-if="beingMaintained === null && holdings" >({{holdings}})</span>
            <span v-if="!(beingMaintained === null && holdings)" >&nbsp;</span>
          </p>
      </span>

      </div>

    <div class="row-3"></div>
    <div @click="showBoxes">
      <!--      search button-->
<!--      <button @click="showBookCover">Show Cover</button>-->
<!--      <button @click="hideBookCover">Hide Cover</button>-->
      <slot name="search-box"  ></slot>

      <!--      search button-->

    </div>


    <div v-if="searchStatusShown">
      <slot
          :closeBookshelfHandler="hideBoxes"
          :shelfIsEmpty="shelfIsEmpty()"
           name="search-status"> </slot>

    </div>
    <div v-if="!searchStatusShown" class="white">&nbsp;</div>

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
        :fetchResultRepository="fetchResultRepository"
        :class="{'moveUpOutOfView': !boxesShown}"
        :bookCoverShown="bookShelfBox.bookCoverShown"
        :book="bookShelfBox.book"
        :library-name="libraryName"
        :index="index"
        :beingMaintained="beingMaintained"
        @fetch-request="onReceiveFetchRequest"
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
import { Subject, empty } from 'rxjs'
// eslint-disable-next-line no-unused-vars
import { concatMap, catchError, delay   } from 'rxjs/operators'
import { v4 } from 'uuid';
import {filter} from 'rxjs/operators';
import {BookAccessFetchingState} from "@/entities/book.fetch.entity";
// eslint-disable-next-line no-unused-vars
import {getEmptyBookShelfBxoes} from "@/workers/upshelf.worker";

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
      let bookShelfBoxes = [];
      // for (let i = 0; i < BookProviderList.length; i ++) {
        // give each provider a shelf.

        for (let i = 0; i < 20; i++) {
          bookShelfBoxes.push(
            // give each shelf box an empty book and a book cover toggle.
            new BookShelfBox()
          )
        }

      // }
      bookShelfRef.value[props.bookProvider] = bookShelfBoxes
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

      const booksLength = books?.length

      if (booksLength > 20) {
        books = books.slice(0, 20);
      }


      //
      books.forEach((bookToLoad, bookIndex) => {
        getThisShelfToSet()[bookIndex].book = bookToLoad;
        getThisShelfToSet()[bookIndex].book.id = v4();
        // console.log("Old Book: ", getThisShelfToSet()[bookIndex].book, "new book", bookToLoad)
        hideOneBookCover(bookIndex);
      })

      // if (booksLength < 20) {
      // for(let i = booksLength; i < 20; i++)
      //   {
      //     getThisShelfToSet()[i].book = new Book();
      //     // console.log("Old Book: ", getThisShelfToSet()[bookIndex].book, "new book", bookToLoad)
      //     hideOneBookCover(i);
      //   }
      // }


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
    libraryUrl: String,
    beingMaintained: String,
    holdings: String,
    showAllLibraryBoxes: Object,
    libraryIndex: Number
  },
  mounted() {
    //start subscribing to showall library boxes. when it emit values, show the boxes
    this.searchAllRequestSub = this.showAllLibraryBoxes?.pipe(delay(100)).subscribe((providerEnum) => {
      // received a request to show all book boxes
      // console.log('received the cmd to show boxes')
      if (providerEnum === this.bookProvider) {
      this.showBoxes()
      }

    })

    // start subscribing to the pipe. the pipe uses concat Map to steamline multiple http requests into a sequence of requests so the server is not overloaded. it sends http requests one after another. and when it comes the time to send the request, it will check again if the request book id still exists. if it exists, proceed with sending the request. otherwise, cancel and wait for the next order.
    this.fetchRequestQueueSub = this.fetchRequestQueue
        .pipe(
            concatMap(async({index, uniqueId, bookId}) => {
              // before the queued fetch request is sent out. Check if the book is still on the shelf. If not, cancel the result altogather.
              console.log('Checking is BookId Is Valid', this.isBookIdValid(bookId))
              if (!this.isBookIdValid(bookId)) { console.log('bookId', bookId, 'no longer existed, drop the request'); return null }
              let result;
              // notify the book that a fetch is starting; here result is yet to be defined
              this.updateFetchResultRepoWithStatus({index, result, status: BookAccessFetchingState.FETCHING})

              // const url = 'https://www.worldmiao.com/api/scraper/access'
                const url = './api/scraper/access'
              // const url = 'http://localhost:9000/scraper/access'
              const payload = {
                uniqueId
                , provider: this.bookProvider}
              console.log('Sending Request', { index, uniqueId, payload, bookId })
              try {
                result = await this.axios.post(url, payload)
                console.log('inner response received', index, result)
                return {index, result}
              } catch(err) {
                console.log('catched!')
                return {index, result: null}
              }
              // this.axios.post(url, payload).then(result => {
              //   console.log('inner response received', index, result)
              //   return {index, result}
              // }).catch(error => {
              //   console.warn('error', error)
              //   empty()
              // })
              //
            }),
            //
            // catchError((err, caught) => {
            //   console.warn('caught', caught)
            //   console.warn('error', err)
            //   return empty('test')
            // }),
            filter(val => val !== null),
        )
        .subscribe((res) => {
          if (typeof res?.index !== 'number') {
            return
          }
          // if (!res.result) {}
          const {index, result} = res

          console.log('outter response received', index, result)
          // drop null results.

          console.log('Received loaded for index,', index, result)
          this.updateFetchResultRepoWithResult({index, result})
        }, () => {console.log('error')},
            () => {
          // in case the fetch failed.
          console.log('completed')
              this.updateFetchResultRepoWithResult(null);

        })
  },
  unmounted() {
    this.fetchRequestQueueSub?.unsubscribe();
    this.searchAllRequestSub?.unsubscribe();
  },
  data() {
    return {
      boxesShown: false,
      searchStatusShown: false,
      fetchRequestQueue: new Subject(),
      fetchResultRepository: new Subject(),
      fetchRequestQueueSub: undefined,
      searchAllRequestSub: undefined,
    }
  },
  methods: {
    // check a book is still on the shelf. notice if the same book is reloaded from the backend, it will have a different id too.
    isBookIdValid(bookId) {
      console.log(this.bookShelfRef[this.bookProvider])
      return this.bookShelfRef[this.bookProvider].findIndex(box => box.book.id === bookId) > - 1
    }
    ,
    updateFetchResultRepoWithResult(val) {
      val.operation = 'result'
      this.fetchResultRepository.next(val)
    },
    updateFetchResultRepoWithStatus(val) {
      val.operation = 'status'
      this.fetchResultRepository.next(val)
    },
    showBoxes: function() {
      if (!this.boxesShown) {

        setTimeout(() => this.boxesShown = true, 0)
        setTimeout(() => this.searchStatusShown = true, 0.8)
        this.fillBookShelfWithEmptyBoxes()
        this.boxesShown = true;
        this.searchStatusShown = true;
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
    },
    onReceiveFetchRequest: function({ index, uniqueId, bookId }) {
      console.log("Library put on queue a new fetch request", { index, uniqueId, bookId })
      this.fetchRequestQueue.next({index, uniqueId, bookId})
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
