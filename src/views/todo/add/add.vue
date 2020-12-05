<template>
  <div class="add">
    <add-contents />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddContents from '@/components/todo/add/add-contents.vue';

export default defineComponent({
    name: 'Add',
    components: {
        AddContents,
    },
    setup() {
    // 以下にApi接続した際の処理を追加していく。
    },
});
</script>
