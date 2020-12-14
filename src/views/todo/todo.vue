<template>
  <div class="todo">
    <to-do-header />
    <to-do-contents />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import  ToDoHeader  from '../../components/todo/todo-header.vue';
import  ToDoContents  from '../../components/todo/todo-contents.vue';

export default defineComponent({
    name: 'ToDo',
    components: {
        ToDoHeader,
        ToDoContents
    },
    setup() {
        // 以下にApi接続した際の処理を追加していく。
    }
});
</script>