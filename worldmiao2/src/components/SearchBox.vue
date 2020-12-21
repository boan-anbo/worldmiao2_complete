<style>
/*.search-input::-webkit-search-cancel-button{*/
/*  position:relative;*/
/*  left:0px;*/
/*  !*-webkit-appearance: searchfield-cancel-button;*!*/
/*  !*border-radius:10px;*!*/
/*  !*background: #3B5957;*!*/
/*}*/
</style>
<template>
<!--  <span>&nbsp;<span v-if="!inputIsEmpty()"-->
<!--      @click="clearInput()"-->
<!--         class="pr-2 text-gray-600 cursor-pointer">clear</span></span>-->

  <div class="grid grid-cols-1">
    <div>
  <label>
    <input style=" background-color: transparent; min-width: 200px"
           maxlength="90"
           class="search-input outline-none text-black border-b text-xs"
           type="search" :value="searchTerm"
           @keyup.enter="makeSearchRequest"
           @input="emitSearchTermChanges($event.target.value)"

    />
    <span :class="{'text-gray-200': this.searchTerm.length <= 2, 'hover:underline': this.searchTerm > 2}"
          class="pl-2 cursor-pointer text-black  outline-none select-none"
          @click="makeSearchRequest">search...</span>
  </label>



    </div>

<!-- search all checkbox-->
    <div v-show="!isRequestValid()" class="text-center">&nbsp;<span  v-if="isInputTooShort()" class="text-red-400 text-xs" >* too short</span></div>
    <div v-show="isRequestValid()" class="checkbox-div select-none" >
      <div style="width: 205px; " class=" inline-block">&nbsp;</div>
      <div class="inline-block" >
      <label >
        <input type="checkbox" :checked="searchAll" @change="toggleSearchAll($event.target.checked)">
        <div class="inline-block pl-2 text-gray-400 text-base">all</div>
      </label>
      </div>

    </div>
  </div>


</template>
<script lang="js">
import { Subject, interval } from 'rxjs';
import {debounce} from 'rxjs/operators'
export default {
  name: 'SearchBox',
  emits: ['update:searchTerm', 'searchRequest', 'onSearchAll'],
  props: {
    searchTerm: String,
    hideSearchButton: Boolean,
    libraryName: String,
    bookProvider: String,
    searchAll: Boolean
  },

  mounted() {
    this.requestEmitter.pipe(debounce(() => interval(800))).subscribe((provider) => {
      console.log("Emiting a request after interval")
      this.$emit('searchRequest', provider)
    })
  },

  unmounted() {
  },
  methods: {
    emitSearchTermChanges(value)  {
      this.localSearchString = value;
      console.log("Emitting Change")
      this.$emit('update:searchTerm', value)
    },
    makeSearchRequest() {
      if (this.searchTerm.length <= 2) {return}
      this.requestEmitter.next(this.bookProvider)
    },
    // check if the search input is valid
    isRequestValid() {
      return this.localSearchString?.trim().length > 2 || this.searchTerm?.trim().length > 2
    },
    isInputTooShort() {
      return (this.localSearchString?.trim().length > 0 && this.localSearchString?.trim().length <= 2) || (this.searchTerm?.trim().length > 0 && this.searchTerm?.trim().length <= 2)
    },
    clearInput() {
      this.localSearchString = '';
      this.emitSearchTermChanges('');
    },
    inputIsEmpty() {
      return !this.localSearchString && !this.searchTerm
    },
    toggleSearchAll(searchAllChecked) {
      this.$emit('onSearchAll', searchAllChecked)
    }
  },
  data() {
    return {
      requestEmitter: new Subject(),
      requestWatcher: null,
      localSearchString: ''
    }
  }
}
</script>
