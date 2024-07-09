<template>
  <!-- 别名 -->
  <el-popover
    placement="bottom"
    trigger="click"
    :popper-style="popperStyle"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="别名"
        content="划选数字或符号，点选合适的读法"
        icon="Alias"
        @click="onClicked"
      />
    </template>
    <div class="alias">
      <el-input placeholder="请输入别名" v-model="alias"></el-input>
      <p class="desc">例如：例如：设置「YYDS」为「永远的神」</p>
      <div class="btn-group">
        <el-button>试听</el-button>
        <el-button>确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
import { useDubbingStore } from "@/store";
import { storeToRefs } from "pinia";
const { quillEditorRef } = storeToRefs(useDubbingStore());

const alias = ref("");
const popperStyle = ref(`width:auto;`);

const onClicked = () => {
  const pos = quillEditorRef.value.getCursorPosition();
  popperStyle.value = `width:auto;left:${pos.x}px;top:${pos.y}px`;
};
</script>

<style lang="scss" scoped>
.alias {
  .desc {
    font-size: 12px;
    color: #666;
    margin: 10px 0;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
}
</style>
