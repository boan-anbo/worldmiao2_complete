
<template>
  <label>
    <input style=" background-color: transparent;" class="outline-none text-black border-b" type="text" :value="searchTerm" @change="emitSearchTermChanges($event.target.value)"  />
  </label>

<!--  <a-button v-if="!hideSearchButton" @click="search()">Search</a-button>-->
  <span class="pl-2 cursor-pointer text-black hover:underline" @click="makeSearchRequest">search...</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SearchBox',
  emits: ['update:searchTerm', 'searchRequest'],
  props: {
    searchTerm: String,
    hideSearchButton: Boolean,
    libraryName: String,
    bookProvider: String
  },
  methods: {
    emitSearchTermChanges(value: string)  {
      console.log("Child Searching", value)
      this.$emit('update:searchTerm', value)
    },
    makeSearchRequest() {
      console.log("Sending Search Request")
      this.$emit('searchRequest', this.bookProvider)
    }
  },
  data() {
    return {

    }
  }
})
</script>
