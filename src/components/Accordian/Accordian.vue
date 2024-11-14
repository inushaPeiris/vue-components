<template>
  <div class="max-w-md mx-auto space-y-4">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border-b border-gray-300"
    >
      <button
        @click="toggleAccordion(index)"
        class="w-full text-left py-3 px-4 font-semibold flex justify-between items-center"
      >
        <span>{{ item.title }}</span>
        <svg
          :class="{ 'transform rotate-180': activeIndex === index }"
          class="w-5 h-5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        v-show="activeIndex === index"
        class="px-4 py-2 text-gray-600"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = [
  { title: 'Accordion Item 1', content: 'This is the content of item 1.' },
  { title: 'Accordion Item 2', content: 'This is the content of item 2.' },
  { title: 'Accordion Item 3', content: 'This is the content of item 3.' },
];

const activeIndex = ref(null);

function toggleAccordion(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
