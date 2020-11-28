<template>
  <!-- contents -->
  <div class="contents flex flex-col">
    <div class="text-left text-gray-50 text-lg black ml-6">
      <h1 class="text-4xl tracking-wide mb-6 mt-3">
        {{ title }}
      </h1>
      <div class="text-gray-400">
        <p>
          When: {{ date }}
        </p>
        <p>
          FromTo: {{ timeRange }}
        </p>
      </div>
    </div>
  </div>
  <!-- contents -->
</template>

<script lang="ts">

import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ToDoContents',
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        date: {
            type: String,
            default: '',
            required: true
        },
        timeRange: {
            type: String,
            default: '',
            required: true
        },
    },
});
</script>