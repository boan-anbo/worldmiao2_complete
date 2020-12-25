<style>
/*.search-input::-webkit-search-cancel-button{*/
/*  position:relative;*/
/*  left:0px;*/
/*  !*-webkit-appearance: searchfield-cancel-button;*!*/
/*  !*border-radius:10px;*!*/
/*  !*background: #3B5957;*!*/
/*}*/

.checkbox {
  display: inline-flex;
  position: relative;
}
.searchall_active {
  color: #5d8d89;
}
.checkbox > span {
  color: #34495E;

}

.checkbox > input {
  height: 18px;
  width: 18px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border-radius: 10px;
  outline: none;
  transition-duration: 0.1s;
  background-color: #e5e7eb;
  border: 1px solid #afc1c1;
  cursor: pointer;
}

.checkbox > input:checked {
  border: 5px solid #e5e7eb;
  background-color: #5d8d89;
}

.checkbox > input:checked + span::before {
  content: '\2713';
  display: block;
  text-align: center;
  color: #e5e7eb;
  position: absolute;
  left: 0.7rem;
  top: 0.2rem;
}

.checkbox > input:active {
  border: 2px solid #3B5957;
}
</style>
<template>
<!--  <span>&nbsp;<span v-if="!inputIsEmpty()"-->
<!--      @click="clearInput()"-->
<!--         class="pr-2 text-gray-600 cursor-pointer">clear</span></span>-->

  <div class="grid grid-cols-1">
    <div>
  <label>
    <input style=" background-color: transparent; min-width: 100px; width: 200px"
           maxlength="90"
           class="search-input px-1 outline-none text-black border-b text-xs"
           type="search" :value="searchTerm"
           @keyup.enter="makeSearchRequest"
           @input="emitSearchTermChanges($event.target.value)"

    />
    <span :class="{'text-gray-200': this.searchTerm.length <= this.searchInputMinLength, 'hover:underline': this.searchTerm > this.searchInputMinLength}"
          class="pl-2 cursor-pointer text-black hover:underline outline-none select-none"
          style="color: #5d8d89"
          @click="makeSearchRequest">search...</span>
  </label>



    </div>

<!-- search all checkbox-->
    <div v-show="!isRequestValid()" class="text-center">&nbsp;<span  v-if="isInputTooShort()" class="text-red-400 text-xs" >* too short</span></div>
    <div v-show="isRequestValid()" class="checkbox-div  select-none" >
      <div style="width: 205px; " class=" inline-block">&nbsp;</div>
      <div class="inline-block" >
      <label class="checkbox hover:underline" title="check to search all libraries">
        <input type="checkbox" :checked="searchAll" @change="toggleSearchAll($event.target.checked)">
        <div
            class=" inline-block pl-2 cursor-pointer  text-base mr-4"
            :class="{ 'searchall_active': searchAll, 'text-gray-400': !searchAll}"
        >all</div>
      </label>
      </div>

    </div>
  </div>


</template>
<script lang="js">
import { Subject, interval, merge } from 'rxjs';
import {debounce, first, skip} from 'rxjs/operators'
export default {
  name: 'SearchBox',
  emits: ['update:searchTerm', 'searchRequest', 'onSearchAll'],
  props: {
    searchTerm: String,
    hideSearchButton: Boolean,
    libraryName: String,
    bookProvider: String,
    searchAll: Boolean,
    searchInputMinLength: Number
  },

  mounted() {
    this.searchDeboucerSub = merge(
    this.requestEmitter.pipe(first()),
    this.requestEmitter.pipe(
        skip(1),
        debounce(() => interval(800)
        ))
    )
        .subscribe((provider) => {
      console.log("Emiting a request after interval")
      this.$emit('searchRequest', provider)
    this.grayOutSearch = false

    })
  },

  unmounted() {
    this.searchDeboucerSub?.unsubscribe()
  },
  methods: {
    emitSearchTermChanges(value)  {
      this.localSearchString = value;
      console.log("Emitting Change")

      this.$emit('update:searchTerm', value)
    },
    makeSearchRequest() {
      if (this.searchTerm.length <= this.searchInputMinLength) {return}
      this.grayOutSearch = true
      this.requestEmitter.next(this.bookProvider)
    },
    // check if the search input is valid
    isRequestValid() {
      return this.localSearchString?.trim().length > this.searchInputMinLength || this.searchTerm?.trim().length > this.searchInputMinLength
    },
    isInputTooShort() {
      return (this.localSearchString?.trim().length > 0 && this.localSearchString?.trim().length <= this.searchInputMinLength) || (this.searchTerm?.trim().length > 0 && this.searchTerm?.trim().length <= this.searchInputMinLength)
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
      localSearchString: '',
      searchDeboucerSub: undefined
    }
  }
}
</script>
