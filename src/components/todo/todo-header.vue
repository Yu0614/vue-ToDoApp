<template>
  <!-- header -->
  <div class="flex todo-header bg-gray-800 h-8 justify-between">
    <button
      type="button"
      name="back button"
      @click="backToLists()"
      class="flex-none text-1xl text-red-600 bold ml-2">
      &lt; 戻る
    </button>
    <!-- header title -->
    <p class="flex-grow black text-center text-xl text-gray-50 pl-20">
      Todo
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
import { useRouter,useRoute } from 'vue-router';

export default defineComponent({
    name: 'ToDoHeader',
    methods:{
        
    },
    setup() {
        
        const router = useRouter();
        const route = useRoute();

        /**
         * ToDoListへ遷移します。
         */
        function backToLists() {
            router.push('/list');
        }

        /**
         * ToDoを編集します。
         */
        function editTodo(){
            const id = route.params.id;
            router.push(`/edit/todo/${id}`);
        }

        return {
            backToLists,
            editTodo,
        };
    }
});
</script>