<template>
  <!-- 别名 -->
  <el-popover
    placement="bottom"
    trigger="click"
    popper-style="width:auto;"
    :show-arrow="false"
  >
    <template #reference>
      <DubbingButton
        title="别名"
        content="划选数字或符号，点选合适的读法"
        icon="zy"
        @click="handleStress"
      ></DubbingButton>
    </template>
    <el-input placeholder="请输入别名"></el-input>
    <p>例如：例如：设置「YYDS」为「永远的神」</p>
    <div>
      <div>试听</div>
      <el-button>确定</el-button>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
import { DubbingDialog, DubbingButton } from "@/components";
</script>

<style lang="scss" scoped>
.stress {
  ul {
    li {
      padding: 10px 0;
    }
  }
}
</style>
