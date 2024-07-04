<template>
  <!-- 多音字 -->
  <el-popover
    placement="bottom"
    trigger="click"
    popper-style="width:auto;"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="多音字"
        content="划选单个汉字，单击完成发音纠错"
        icon="dyz"
        @click="handlePolyphone"
      ></DubbingButton>
    </template>
    <el-button-group>
      <el-button type="primary">de</el-button>
      <el-button type="primary">di</el-button>
      <el-button type="primary">di2</el-button>
      <el-button type="primary">di4</el-button>
      <el-button type="primary">di</el-button>
    </el-button-group>
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
