<template>
  <add-header
    :data="input" />
  <!-- contents -->
  <div class="contents flex flex-col">
    <form>
      <!-- title & place section -->
      <div class="flex flex-col border border-gray-500 divide-y divide-gray-700 mt-6">
        <input
          required
          name="title"
          v-model="input.title"
          placeholder="タイトル"
          class="bg-gray-800 pl-3 text-gray-50 text-xl h-10"
          type="text" />
        <input
          name="place"
          v-model="input.place"
          placeholder="場所"
          class="bg-gray-800 pl-3 text-gray-50 text-xl h-10"
          type="text" />
      </div>
      <!-- title & place section -->

      <!-- timeRange -->
      <div class="flex flex-col mt-6 border border-gray-500 divide-y divide-gray-700">
        <Calendar
          required
          class=""
          v-model="input.start_date"
          placeholder="開始"
          :locale="setting.ja"
          :show-time="true"
          :touch-u-i="true"
          :show-button-bar="true"
          date-format="yy年 mm月dd日"
          hour-format="24" />
        <Calendar
          class=""
          v-model="input.end_date"
          placeholder="終了"
          :locale="setting.ja"
          :show-time="true"
          :touch-u-i="true"
          :show-button-bar="true"
          date-format="yy年 mm月dd日"
          hour-format="24"
          @date-select="validateTimeRange(input.start_date, input.end_date)" />
      </div>
      <!-- timeRange -->

      <!-- URL & TextArea -->
      <div class="flex flex-col border border-gray-500 divide-y divide-gray-700 mt-6">
        <input
          name="URL"
          v-model="input.url"
          placeholder="URL"
          class="bg-gray-800 pl-3 text-gray-50 text-xl h-10"
          type="url" />
        <Textarea
          class="pl-3 text-gray-50 text-xl border"
          v-model="input.memo"
          placeholder="メモ"
          rows="5"
          cols="30" />
      </div>
      <!-- URL & TextArea -->
    </form>
  </div>
  <!-- contents -->
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue/';
import AddHeader from '@/components/todo/add/add-header.vue';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import { TodoList } from '@/components/interface/todoList';

export default defineComponent({
    /* eslint-disable @typescript-eslint/camelcase */
    name: 'AddContents',
    components: {
        Calendar,
        Textarea,
        AddHeader,
    },
    setup() {
        const input = reactive<TodoList>({
            start_date: '', 
            end_date: '',
            place: '',
            title: '',
            url: '',
            memo: '',
        });

        /**
         * カレンダーで使用するデータ群
         */
        const setting = reactive<{
            ja: {
                firstDayOfWeek: number;
                dayNames: string[];
                dayNamesShort: string[];
                dayNamesMin: string[];
                monthNames: string[];
                monthNamesShort: string[];
                dateFormat: string;
                clear: string;
                today: string;
            };
        }>({
            ja: {
                firstDayOfWeek: 0,
                dayNames: ['日', '月', '火', '水', '木', '金', '土'],
                dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
                dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dateFormat: 'mm/dd/yy',
                clear: 'Clear',
                today: 'Today',
            },
        });

        /**
         * 開始時間と終了時間を比較し、終了時間が開始時間より前に設定された場合は警告を出します。
         */
        function validateTimeRange(s: Date, e: Date): void {
            const start = new Date(s).getTime();
            const end = new Date(e).getTime();
            if (start > end) {
                window.alert(`終了時間は開始時間より後に設定してください！\n開始時間: ${input.start_date}`);
            }
        }

        return {

            // data
            input,
            setting,

            // funcitions
            validateTimeRange,
        };
    },
});
</script>

<style>
.p-inputtext {
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding-left: 0.75rem;
  color: rgba(156, 163, 175);
  border: 0px;
  border-radius: none;
}

.p-inputtextarea {
  border: 1px solid rgba(156, 163, 175);
}

.special-day {
  text-decoration: line-through;
}
</style>
