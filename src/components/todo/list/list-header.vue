<template>
  <!-- header -->
  <div class="flex list-header bg-gray-800 h-8 justify-between">
    <button
      type="button"
      name="back"
      @click="search()"
      class="flex-none text-1xl text-red-600 bold ml-2 mr-20">
      🔍
    </button>
    <!-- header title -->
    <p class="flex-grow black text-center text-xl text-gray-50">
      Todo
    </p>
    <!-- header title -->
    <button
      type="button"
      name="add"
      @click="add()"
      class="flex-none text-2xl text-red-600 ml-20 mr-2">
      +
    </button>
  </div>
  <!-- header -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    /* eslint-disable @typescript-eslint/camelcase */
    name: 'ListHeader',
    props: {},
    setup(){

        // for routing
        const router = useRouter();

        /**
         * 新規にToDoを追加する画面に遷移します。
         */
        function add() :void {
            router.push('/add');
        }

        /**
         * 新規にToDoを追加する画面に遷移します。
         */
        function search() :void {
            window.alert('今後追加される機能です。');
        }

        return {
            add,
            search
        };
    },
    
});
</script>
