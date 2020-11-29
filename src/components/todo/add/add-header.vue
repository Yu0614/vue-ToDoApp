<template>
  <!-- header -->
  <div class="flex todo-header bg-gray-800 h-8 justify-between">
    <button
      type="button"
      name="back"
      class="flex-none text-1xl text-red-600 bold ml-2"
      @click="cancel()">
      キャンセル
    </button>
    <!-- header title -->
    <p class="flex-grow black text-center text-xl text-gray-50">
      新規イベント
    </p>
    <!-- header title -->
    <button
      type="button"
      name="edit"
      @click="add()"
      class="flex-none text-1xl text-red-600 ml-20 mr-2">
      追加
    </button>
  </div>
  <!-- header -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AddHeader',
    props: {
        backButtonName: {
            type: String,
            default: '',
            required: true,
        },
        data: {
            default: null,
            type: null,
        },
    },
    setup(props: { 
        data: {
            startDate: string; 
            endDate: string; 
            place: string;
            title: string;
            url: string;
            memo: string;
        }
    }){
        
        /**
         * ToDoListへ遷移します。
         */
        function cancel() :void {
            this.$router.push('/list');
        }

        /**
         * ToDoを編集追加します。追加が正常に完了した場合は 追加されたToDoに遷移します。
         */
        function add() :void {
            if (props.data.title === '') {
                window.alert('タイトルが未入力です。入力してください。');
                return;
            }

            // const targetTodo = 1;
            // this.$router.push(`/todo/${targetTodo}`);
        }

        return {
            add,
            cancel
        };
    },
    
});
</script>
