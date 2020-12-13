<template v-if="!meta.loading">
  <list-header />
  <!-- todo list の表示 -->
  <div
    v-for="(todo, index) in input.todos" 
    :key="index"
    @click="detail(todo.id)"
    class="text-white border border-gray-500 flex justify-between pt-2 pb-2 hover:bg-red-500 ">
    <h1 class="font-extrabold ml-3 text-xl mb-4">
      {{ todo.title }} 
    </h1>
    <div class="text-gray-400 text-sm mr-2 mt-1">
      <p class="text-white">
        {{ convertDate(todo.start_date) }}
      </p>
      <p 
        v-if="todo.start_date !== todo.end_date" 
        class="text-gray-400">
        {{ convertDate(todo.end_date) }}
      </p>
    </div>
  </div>
  <!-- todo list の表示 -->
  <!-- loading -->
  <img 
    v-if="meta.loading"
    src="@/assets/loading.gif" 
    alt="loading"
    class="h-10 w-10 ml-44">
  <!-- loading -->
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue';
import ListHeader from '@/components/todo/list/list-header.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { EndPoints } from '../../../service/add/todos.service';


export default defineComponent({
    name: 'List',
    components: {
        ListHeader
    },
    setup() {
        interface TodoList {
            id: number;
            userId :number;
            title :string;
            place? :string;
            url? :string;
            memo? :string;
            start_date? :string;
            end_date? :string;
        }
    
        const input = reactive<{
            todos: TodoList[],
        }>({
            todos: []
        });

        const meta = reactive<{
            loading: boolean,
        }>({
            loading: true
        });

        // for routing
        const router = useRouter();
        const dummyUserId = 1;

        /**
         * 午前午後を am/pm で変換して返します。
         */
        function convertDate (originDate:string) : string {         
            if (originDate === undefined || originDate === null){
                
                return '';
            }
            const date = new Date(originDate);  
            let hours = Number(date.getHours());
            let minutes: number | string = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes.toString() : minutes;
            const strTime = hours + ':' + minutes + ' ' + ampm;
            
            return strTime;
        }

        /**
         * クリックされた todo に遷移します。
         */
        function detail (id:number) : void {
            router.push(`/todo/${id}`);
        }

        /**
         * user_id に対応した todoを全件取得します。
         *  L 取得し終わると todo のリストを表示します。
         */
        function getLists () : void {
            const url = `${EndPoints.todos}/?user_id=${dummyUserId}`;
            axios.get(url).then((response) => {
                input.todos = response.data;
                meta.loading = false;
            }).catch( () => {
                window.alert('正常に追加できませんでした。後で再度お試しください。');
            });
        }
        
        getLists();

        return {
            // data
            input,
            meta,
            // funcitions
            detail,
            convertDate
        };
    },
});
</script>