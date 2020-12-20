

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
      編集
    </p>
    <!-- header title -->
    <button
      type="button"
      name="edit"
      @click="update()"
      class="flex-none text-1xl text-red-600 ml-20 mr-2">
      更新
    </button>
  </div>
  <!-- header -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { EndPoints, HeaderInfo } from '../../../service/add/todos.service';
import { TodoList } from '@/components/interface/todoList';

export default defineComponent({
    /* eslint-disable @typescript-eslint/camelcase */
    name: 'EditHeader',
    props: {
        data: {
            default: null,
            type: null,
        },
    },
    setup(props: { 
        data: {
            todo: TodoList
        }
    }){
        
        // for routing
        const router = useRouter();
        const route = useRoute();

        /**
         * ToDoListへ遷移します。
         */
        function cancel() :void {
            const id = route.params.id;
            router.push(`/todo/${id}`);
        }

        /**
         * ゼロ埋めして返します。
         */
        function zeroFill(number: number) :string {
            if (10 > number) {
                return `0${number}`;
            } else {
                return number.toString();
            }
        }

        /**
         * 日付を投稿用に整形して返します。
         */
        function processDate(date:string | number | Date | undefined) :string | null {
            if (date === '' || date === undefined || date === null) {
                return null;
            }
            const originDate = new Date(date);
            const year = originDate.getFullYear();
            const month = originDate.getMonth() + 1;
            const days = originDate.getDate();
            const hours = zeroFill(originDate.getHours());
            const mins = originDate.getMinutes();
            const seconds = originDate.getSeconds();
        
            return `${year}-${month}-${days} ${hours}:${mins}:${seconds}`;
        }



        /**
         * ToDoを編集追加します。追加が正常に完了した場合は 追加されたToDoに遷移します。
         */
        function update() :void {
            
            if (props.data.todo.title === '') {
                window.alert('タイトルが未入力です。入力してください。');
                return;
            }

            const request = {
                id: route.params.id,
                user_id: 1, // 後で変更する
                title: props.data.todo.title,
                place: props.data.todo.place,
                url: props.data.todo.url,
                memo: props.data.todo.memo,
                start_date: processDate(props.data.todo.start_date),
                end_date: processDate(props.data.todo.end_date),
            };
            

            const url = `${EndPoints.todo}/${route.params.id}`;
            
            // put 処理
            axios.put(url, request, {
                headers: HeaderInfo.defaultHeaders}).then(() => {
                router.push(`/todo/${route.params.id}`);
            }).catch( () => {
                window.alert('正常に更新できませんでした。後で再度お試しください。');
            });
            
        }

        return {
            update,
            cancel
        };
    },
    
});
</script>
