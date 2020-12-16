
<template>

  <label>
    <input style=" background-color: transparent;" class="outline-none text-black border-b" type="text" :value="searchTerm" @keyup.enter="makeSearchRequest"  @input="emitSearchTermChanges($event.target.value)"  />
  </label>


  <span :class="{'text-gray-200': localSearchString?.length < 3}" class="pl-2 cursor-pointer text-black hover:underline" @click="makeSearchRequest">search...</span>


</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Subject, interval } from 'rxjs';
import {debounce} from 'rxjs/operators'
export default defineComponent({
  name: 'SearchBox',
  emits: ['update:searchTerm', 'searchRequest'],
  props: {
    searchTerm: String,
    hideSearchButton: Boolean,
    libraryName: String,
    bookProvider: String
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
    emitSearchTermChanges(value: string)  {
      this.localSearchString = value;
      console.log("Emitting Change")
      this.$emit('update:searchTerm', value)
    },
    makeSearchRequest() {
      if (!this.isRequestValid()) {return}
      this.requestEmitter.next(this.bookProvider)
    },
    isRequestValid() {
      return this.localSearchString?.length > 3
    }
  },
  data() {
    return {
      requestEmitter: new Subject(),
      requestWatcher: null,
      localSearchString: ''
    }
  }
})
</script>
