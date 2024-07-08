<template>
  <!-- 停顿调节 -->
  <el-popover
    placement="bottom"
    trigger="click"
    :popper-style="popperStyle"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="停顿调节"
        content="停顿调节"
        icon="pause"
        @click="handleClicked"
      />
    </template>
    <el-button-group>
      <el-button type="primary" @click="handlePause(0)">无停顿</el-button>
      <el-button type="primary" @click="handlePause(100)">短</el-button>
      <el-button type="primary" @click="handlePause(200)">中</el-button>
      <el-button type="primary" @click="handlePause(500)">长</el-button>
    </el-button-group>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";

const { editorRef } = storeToRefs(useDubbingStore());

const popperStyle = ref("width:auto;");

const handleClicked = () => {
  const rect = editorRef.value.getCursorPosition();
  popperStyle.value = `width:auto;left:${rect.left - 16}px;top:${rect.top + 22}px`;
};

const handlePause = (value) => {
  editorRef.value.insertElement(value);
};

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
