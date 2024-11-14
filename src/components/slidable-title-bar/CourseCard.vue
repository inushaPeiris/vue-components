<template>
  <div
      :class="
          title === selectedPage
              ? 'bg-white p-3 border-b-2 w-fit border-black-900'
              : 'bg-white p-3 border-b-2 w-fit border-black'
      "
  >
      <div class="block text-left">
          <h2 class="text-lg font-normal text-black-650 ">
              {{ title }}
          </h2>
      </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
      type: String,
      required: true,
  },
  selectedPage: {
      type: String,
      default: null,
  },
  groupedFaqs: {
      type: Object,
      default: () => ({}),
  },
});
</script>
