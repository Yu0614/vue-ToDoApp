<template>
  <!-- header -->
  <div class="flex todo-header bg-gray-800 h-8 justify-between">
    <button
      type="button"
      name="back button"
      @click="backToLists()"
      class="flex-none text-1xl text-red-600 bold ml-2">
      &lt; {{ backButtonName }}
    </button>
    <!-- header title -->
    <p class="flex-grow black text-center text-xl text-gray-50">
      イベントの詳細
    </p>
    <!-- header title -->
    <button
      type="button"
      name="edit button"
      @click="editTodo()"
      class="flex-none text-1xl text-red-600 ml-20 mr-2">
      編集
    </button>
  </div>
  <!-- header -->
</template>

<script lang="ts">

import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ToDoHeader',
    props: {
        backButtonName: {
            type: String,
            default: '',
            required: true
        },
    },
    methods:{
        /**
         * ToDoListへ遷移します。
         */
        backToLists(){
            this.$router.push('/list');
        },
        /**
         * ToDoを編集します。
         */
        editTodo(){
            this.$router.push('/edit');
        }
    }
});
</script>