<template>
  <div class="add">
    <edit-contents />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditContents from '@/components/todo/edit/edit-contents.vue';

export default defineComponent({
    name: 'Edit',
    components:{
        EditContents
    }
});
</script>
