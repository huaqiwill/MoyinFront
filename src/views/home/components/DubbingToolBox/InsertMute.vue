<template>
  <!-- 插入停顿 -->
  <el-popover
    placement="bottom"
    trigger="click"
    popper-style="width:auto;"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="插入静音"
        content="从光标处开始试听"
        @click="handleInsertPause"
      ></DubbingButton>
    </template>
    <div>
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio value="1">所有段落</el-radio>
        <el-radio value="2">当前段落</el-radio>
      </el-radio-group>
      <el-checkbox v-model="checked1" label="显示静音段落" />
    </div>
    <el-button-group>
      <el-button type="primary">100ms</el-button>
      <el-button type="primary">150ms</el-button>
      <el-button type="primary">200ms</el-button>
      <el-button type="primary">300ms</el-button>
      <el-button type="primary">400ms</el-button>
      <el-button type="primary">600ms</el-button>
    </el-button-group>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";

const handleInsertPause = () => {};

const customValue = ref("");

const polyphoneList = ref([
  {
    name: "sha",
    pos: "1",
  },
  {
    name: "sha",
    pos: "1",
  },
  {
    name: "sha",
    pos: "1",
  },
  {
    name: "sha",
    pos: "1",
  },
]);
const visible = ref(true);
</script>

<style lang="scss" scoped>
.popper-class {
  min-width: 20px !important;
  width: auto;
}

.polyphone {
  display: flex;
}

ul {
  background-color: #fff;
  display: flex;
  gap: 10px;

  li {
    border: 1px solid #e5e5e5;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      color: #6aa4fc;
      background-color: #e8f1fe;
    }
  }
}
</style>
