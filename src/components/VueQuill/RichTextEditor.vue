<template>
  <div class="editor-container">
    <QuillEditor
      v-model:content="content"
      ref="myQuillEditor"
      :options="editorOption"
      toolbar="full"
      @update:content="onEditorChange"
    />
    
    <!-- Test buttons -->
    <div class="mt-4 space-x-2">
      <button @click="getHTMLContent" class="px-4 py-2 bg-blue-500 text-white rounded">
        Get HTML Content
      </button>
      <button @click="loadSampleHTML" class="px-4 py-2 bg-green-500 text-white rounded">
        Load Sample HTML
      </button>
    </div>
    
    <!-- Preview of HTML content -->
    <div class="mt-4">
      <h3>HTML Content:</h3>
      <pre class="bg-gray-100 p-4 mt-2">{{ savedHTML }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const content = ref('');
const myQuillEditor = ref(null);
const savedHTML = ref('');

// Sample HTML content (simulating database content)
const sampleHTML = '<p><strong>This is bold</strong> and <em>this is italic</em></p>';

const editorOption = {
  theme: 'snow',
  placeholder: 'Type here...',
  modules: {
    // Add more modules as needed

    // Example modules: custom toolbar, image upload, etc.
    // toolbar: [
    //   [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    //   [{size: []}],
    //   ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //   [{'list': 'ordered'}, {'list': 'bullet'}, 
    //    {'indent': '-1'}, {'indent': '+1'}],
    //   ['link', 'image', 'video'],
    //   ['clean']
    // ]
  }
};

// Get HTML content to save to database
const getHTMLContent = () => {
  const editor = myQuillEditor.value.getQuill();
  const html = editor.root.innerHTML;
  savedHTML.value = html;
  
  // This is what you would send to your backend
  console.log('HTML to save:', html);
  
  // Example API call:
  // await saveToDatabase(html);
};

// Example function to save to database
const saveToDatabase = async (html) => {
  try {
    const response = await fetch('/api/save-content', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        html_content: html 
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to save content');
    }
    
    console.log('Content saved successfully');
  } catch (error) {
    console.error('Error saving content:', error);
  }
};

// Load HTML content (simulating loading from database)
const loadSampleHTML = () => {
  const editor = myQuillEditor.value.getQuill();
  editor.root.innerHTML = sampleHTML;
  savedHTML.value = sampleHTML;
};

const onEditorChange = () => {
  // Automatically update savedHTML whenever content changes
  const editor = myQuillEditor.value.getQuill();
  savedHTML.value = editor.root.innerHTML;
};
</script>

<style scoped>
.editor-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
