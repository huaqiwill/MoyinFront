<template>
  <div class="dubbing-footer">
    <div class="footer-item">
      <div class="title">语速：</div>
      <el-slider
        style="width: 600px"
        v-model="value"
        range
        :marks="marks"
        :min="0"
        :max="2"
        :step="0.1"
      />
    </div>
    <div class="footer-item">
      <div class="title">语调：</div>
      <el-slider
        style="width: 600px"
        v-model="value"
        range
        :marks="marks"
        :min="0"
        :max="2"
        :step="0.1"
      />
    </div>
    <div class="footer-item">
      <div class="title">输出格式：</div>
      <el-select
        size="mini"
        v-model="formatter"
        placeholder="Select"
        style="width: 240px"
      >
        <el-option
          v-for="item in formatterOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";

import { reactive, ref } from "vue";
import type { CSSProperties } from "vue";

interface Mark {
  style: CSSProperties;
  label: string;
}

type Marks = Record<number, Mark | string>;

const value = ref([0, 2]);
const marks = reactive<Marks>({
  0: "0",
  0.1: "0.1",
  0.2: "0.2",
  0.3: "0.2",
  0.4: "0.4",
  0.5: "0.5",
  0.6: "0.6",
  0.7: "0.7",
  0.8: "0.8",
  0.9: "0.9",
  1.0: "1.0",
  1.1: "1.1",
  1.2: "1.2",
  1.3: "1.3",
  1.4: "1.4",
  1.5: "1.5",
  1.6: "1.6",
  1.7: "1.7",
  1.8: "1.8",
  1.9: "1.9",
  2.0: "2.0",
});

// 语速
const pace = ref(1);
const paceOptions = ref([
  { label: "0.2 speed", value: 0.2 },
  { label: "0.4 speed", value: 0.4 },
  { label: "0.6 speed", value: 0.6 },
  { label: "0.8 speed", value: 0.8 },
  { label: "1.0 speed", value: 1.0 },
  { label: "1.2 speed", value: 1.2 },
  { label: "1.4 speed", value: 1.4 },
  { label: "1.6 speed", value: 1.6 },
  { label: "1.8 speed", value: 1.8 },
  { label: "2.0 speed", value: 2.0 },
]);
const handlePaceChange = () => {};

// 语调
const intonation = ref(1);
const intonationOptions = ref([
  { label: "正常", value: 1 },
  { label: "偏高", value: 1.2 },
  { label: "偏低", value: 0.8 },
]);
const handleIntonationChange = () => {};

// 输出格式
const formatter = ref("mp3");
const formatterOptions = [
  { label: "MP3", value: "mp3" },
  { label: "WAV", value: "wav" },
];

const handleGenerateDubbing = () => {};

const handleDownloadDubbing = () => {};

const handleGenerateLog = () => {};

const handleClearWord = () => {};

const dialogDubConfig = ref(false);
</script>

<style lang="scss" scoped>
.dubbing-footer {
  background-color: #f4f6f7;
  border-radius: 5px;
  padding: 0 15px;
  gap: 10px;

  .footer-item {
    .title {
      font-size: 12px;
      margin-bottom: 6px;
    }
  }

  .button-group {
    width: 300px;
    .button-item {
      margin-bottom: 10px;
      gap: 10px;
    }
  }
}
</style>
