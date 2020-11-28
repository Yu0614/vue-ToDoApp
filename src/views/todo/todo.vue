<template>
  <div class="todo">
    <to-do-header :back-button-name="shortenDate" />
    <to-do-contents
      :title="title"
      :date="date"
      :time-range="timeRange" />
  </div>
</template>

<script lang="ts">

interface DateObject {
    year: string;
    month: string;
    date: string;
    dayOfwWeek: string;
}

import { defineComponent } from 'vue';
import  ToDoHeader  from '../../components/todo/todo-header.vue';
import  ToDoContents  from '../../components/todo/todo-contents.vue';

export default defineComponent({
    name: 'ToDo',
    props: {
        title: {
            type: String,
            default: 'This is title of Todo'
        },
        startTime: {
            type: String,
            default: '午後6時'
        },
        endTime: {
            type: String,
            default: '午後7時'
        },
    },
    computed: {
        /**
         * 日付と曜日を返します。
         *  L Format: △△△△年OO月XX日 □曜日
         */
        date () :string {
            const data: DateObject = this.getDateObject();
            return `${data.year}${data.month}${data.date} ${data.dayOfwWeek}`;
        },
        /**
         * 省略した日付を返します。
         *  L Format: OO月XX日
         */
        shortenDate () :string {
            const data: DateObject = this.getDateObject();
            return `${data.month}${data.date}`;
        },
        /**
         * イベントの開始時間と終了時間を返します。
         */
        timeRange () :string {
            return `${this.$props.startTime}〜${this.$props.endTime}`;
        }
    },
    methods: {
        /**
         * 日付関連のデータを整形して返します。
         */
        getDateObject() : DateObject {
            const data = new Date(Date.now()); // Setupで取得したAPIからの値で置き換える
            const year = `${data.getFullYear()}年`;
            const month = `${data.getMonth()+1}月`;
            const date = `${data.getDate()}日`;
            const dayName = ['日','月','火','水','木','金','土'];
            const dayOfwWeek = `${dayName[data.getDay()]}曜日`;

            return {
                year,
                month,
                date,
                dayOfwWeek
            };
        }
    },
    components: {
        ToDoHeader,
        ToDoContents
    },
    setup() {
        // 以下にApi接続した際の処理を追加していく。
        
    }
});
</script>