<template>
  <!-- 符号停顿 -->
  <el-popover
    placement="bottom"
    trigger="click"
    popper-style="width:auto;"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="符号停顿"
        content="从光标处开始试听"
        icon="symbol"
      ></DubbingButton>
    </template>
    <div>
      <h2>只能分句模式</h2>
      <p>
        开启：智能分句开启后，将使用更自然真人的高阶模型算法，极大的提升发音人的自然度，更加媲美真人。
      </p>
      <p>关闭：关闭后，将优先根据标点符号进行分句，可精准控制标点符号断句时长。</p>
      <p>注意：符号静音设置为全局设置，改动后全局生效</p>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";

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
