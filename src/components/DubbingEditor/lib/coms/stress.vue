<script setup>
import { ElMessage } from "element-plus";
const onClicked = () => {
  ElMessage({
    message: "你好",
    type: "warning",
  });
};
</script>

<template>
  <div class="stress" @click="onClicked">你好</div>
</template>

<style lang="scss" scoped>
.stress {
  width: 40px;
  height: 30px;
  line-height: 30px;
  background-color: red;
}
</style>
