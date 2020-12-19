

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
import { useRouter } from 'vue-router';
import axios from 'axios';
import { EndPoints, HeaderInfo } from '../../../service/add/todos.service';

export default defineComponent({
    /* eslint-disable @typescript-eslint/camelcase */
    name: 'AddHeader',
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

        // for routing
        const router = useRouter();

        /**
         * ToDoListへ遷移します。
         */
        function cancel() :void {
            router.push('/list');
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
        function processDate(date:string) :string | null {
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
        function add() :void {
            if (props.data.title === '') {
                window.alert('タイトルが未入力です。入力してください。');
                return;
            }

            const request = {
                user_id: 1, // 後で変更する
                title: props.data.title,
                place: props.data.place,
                url: props.data.url,
                memo: props.data.memo,
                start_date: processDate(props.data.startDate),
                end_date: processDate(props.data.endDate),
            };
            
            // post 処理
            axios.post(EndPoints.todos, request, {
                headers: HeaderInfo.defaultHeaders}).then( (response: {data: {id: number}}) => {
                router.push(`/todo/${response.data.id}`);
            }).catch( () => {
                window.alert('正常に追加できませんでした。後で再度お試しください。');
            });
            
        }

        return {
            add,
            cancel
        };
    },
    
});
</script>
