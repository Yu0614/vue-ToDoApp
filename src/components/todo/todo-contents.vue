<template>
  <!-- contents -->
  <div 
    class="contents flex flex-col text-left" 
    v-if="!meta.loading">
    <div class="text-gray-50 text-lg black ml-6">
      <!-- タイトル -->
      <h1 class="text-4xl tracking-wide mb-6 mt-3">
        {{ input?.todo?.title }}
      </h1>
      <!-- タイトル -->
      <!-- 場所 -->
      <p 
        v-if="input.todo?.place"
        class="text-red-500">
        {{ input?.todo?.place }}
      </p>
      <!-- 場所 -->
      <!-- 日時 -->
      <p 
        v-if="input.todo?.start_date"
        class="text-gray-400">
        {{ getStandardDisplayTimes(input?.todo?.start_date) }}
      </p>
      <!-- 日時 -->
      <!-- 時間幅 -->
      <p 
        v-if="input.todo?.start_date"
        class="text-gray-400">
        {{ getTimeRange(input.todo) }}
      </p>
      <!-- 時間幅 -->
    </div>
    <!-- URL -->
    <p 
      v-if="input.todo?.url"
      class="text-white text-xl ml-6 mt-3 border-t border-gray-400 pt-3">
      URL
      <br>
      <a 
        class="text-red-500 hover:text-blue-500"
        :href="input.todo?.url" 
        ref="noopener"
        target="_blank">
        {{ input.todo?.url }}
      </a>
    </p>
    <!-- URL -->
    <!-- メモ -->
    <div 
      v-if="input.todo?.memo"
      class="text-white text-xl ml-6 mt-3 border-t border-b border-gray-400 pt-3 pb-3">
      メモ
      <br>
      <p class="text-gray-400">
        {{ input.todo?.memo }}
      </p>
    </div>
    <!-- メモ -->
  </div>
  <!-- contents -->
</template>

<script lang="ts">

import { defineComponent,reactive } from 'vue';
import axios from 'axios';
import { EndPoints } from '../../service/add/todos.service';
import { useRoute, useRouter } from 'vue-router';
import router from '../../router/index';

export default defineComponent({
    name: 'ToDoContents',
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

        // 画面表示の管理用
        const meta = reactive<{
            loading: boolean,
        }>({
            loading: true
        });

        const input = reactive<{
            todo: TodoList | null,
        }>({
            todo: null
        });

        // query params を取得
        const route = useRoute();
        const router = useRouter();

        /**
         * query params が 数字かどうか判定し、数字以外なら適切なページへ遷移させます。
         */
        function initialize() : void {
            const id = Number(route.params.id);
            if (isNaN(id)) {
                router.push('/list');
            }
            return;
        }

        /**
         * 午前/午後XX時 のフォーマットで返します。
         */
        function changeHourFormatForDisplay(date: Date) : string  {
            let hours = Number(date.getHours());
            const ampm = hours >= 12 ? '午後' : '午前';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            const strTime = ampm + hours + '時';
            return strTime;
        }

        /**
         * 午前/午後XX時 ~ 午前/午後YY時 のフォーマットで返します。
         *  L XX と YYが一致していたら start_dateの分だけ返します。
         */
        function getTimeRange(data: TodoList | null) : string {
            if (data === null) {
                
                return '';
            }

            const item = {
                start: {
                    ampm: '',
                },
                end: {
                    ampm: '',
                },
                formatted : ''
            };

            if (data.start_date) {
                const st = new Date(data.start_date);
                item.start.ampm = changeHourFormatForDisplay(st);
            }

            if (data.end_date) {
                const ed = new Date(data.end_date);
                item.end.ampm = changeHourFormatForDisplay(ed);
            }
            
            return item.start.ampm === item.end.ampm ? `${item.start.ampm}` : `${item.start.ampm} ~ ${item.end.ampm}`;
        }

        /**
         * YYYY年MM月DD日 XX曜日 のフォーマットで返します。
         */
        function getStandardDisplayTimes(data: TodoList | null) : string {
            if (data === null) {
                return '';
            }
            const date = new Date(data);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const days = date.getDate();
            const day = [ '日', '月', '火', '水', '木', '金', '土' ][date.getDay()];

            return `${year}年${month}月${days}日 ${day}曜日`;
        }

        /**
         * user_id に対応した todoを全件取得します。
         *  L 取得し終わると todo のリストを表示します。
         */
        function getTodo() : void {
            initialize();
            const url = `${EndPoints.todo}/${route.params.id}`;
            axios.get(url).then((response) => {
                input.todo = response.data as TodoList;
                meta.loading = false;
            }).catch( () => {
                window.alert('正常に追加できませんでした。後で再度お試しください。');
            });
        }

        getTodo(); // call api

        return {
            initialize,
            input,
            meta,
            getTodo,
            getTimeRange,
            getStandardDisplayTimes
        };
    }
});
</script>