<script setup>
import Content from "./components/Topic-on-the-left-and-the-content-on-right/Content.vue";
import Accordian from "./components/Accordian/Accordian.vue";
import Courses from "./components/slidable-title-bar/Courses.vue";
import DataProvider from "./components/slidable-title-bar/DataProvider.vue";
import RichTextEditor from "./components/VueQuill-rich-text-editor/RichTextEditor.vue";
import DisplayHtmlContent from "./components/VueQuill-rich-text-editor/DisplayHtmlContent.vue";
</script>

<template>
  <div>
    <h1>Vue 3 Quill Editor</h1>
    <RichTextEditor />
    <DisplayHtmlContent />
  </div>
</template>
