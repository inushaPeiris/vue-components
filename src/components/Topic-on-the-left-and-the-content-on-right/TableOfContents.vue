<template>
  <div>
    <h2 class="text-4xl font-semibold pb-8 border-b-2 border-gray-300">
      Table of Contents
    </h2>
    <ul>
      <li
        v-for="(topic, index) in topics"
        :key="index"
        @click="selectTopic(topic)"
        class="cursor-pointer p-6 border-b-2 border-gray-300 text-lg font-medium"
      >
        <div class="hidden md:block">
          <span class="flex gap-2">
            <span>0.{{ topic.id }}</span>
            <span>{{ topic.title }}</span>
          </span>
        </div>
        <div class="md:hidden">
          <button
            @click="toggleAccordion(index)"
            class="w-full text-left py-3 px-4 font-semibold flex justify-between items-center"
          >
            <span class="flex gap-2 sticky top-0">
              <span>0.{{ topic.id }}</span>
              <span>{{ topic.title }}</span>
            </span>
          </button>
          <div v-show="activeIndex === index" class="px-4 py-2 text-gray-600">
            <div v-html="topic.content"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

// Accept topics as props
const props = defineProps({
  topics: {
    type: Array,
    required: true,
  },
});

// Emit event when a topic is selected
const emit = defineEmits(["topic-selected"]);
const activeIndex = ref(null);

function toggleAccordion(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}

function selectTopic(topic) {
  emit("topic-selected", topic);
}
</script>
