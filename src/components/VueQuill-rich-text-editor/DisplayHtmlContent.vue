<template>
  <div class="content-container">
    <!-- Display component -->
    <div class="ql-editor">
      <h2 class="mb-4">Rendered Content</h2>
      <div 
        class="ql-content-display"
        v-html="htmlContent"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import 'quill/dist/quill.core.css'

const htmlContent = ref('<p class="ql-align-center"><span class="ql-size-huge">Announcement</span></p><p class="ql-align-center"><br></p><ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elitfdfd</li></ul><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p>');
</script>

<style scoped>
.content-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>

