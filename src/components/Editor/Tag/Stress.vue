<template>
  <div class="stress" @click="handleClicked">{{ name }}</div>
</template>

<script setup>
import { defineProps } from "vue";
const handleClicked = () => {
  alert("重音");
};

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.stress {
  font-size: 12px;
  line-height: 16px;
  width: 34px;
  color: #666;
  background-color: #eff8f2;
  padding: 3px;
  border: 1px solid #2da94f;
  position: absolute;
  border-radius: 4px;
  white-space: nowrap; /*强制span不换行*/
  position: relative;

  .x {
    position: absolute;
    right: -6px;
    top: -9px;
    border-radius: 50%;
    border: 1px solid red;
    color: red;
    padding: 3px;
    width: 12px;
    height: 12px;
    &:hover {
      color: #fff;
      background-color: #e02020;
    }
  }
  // pointer-events: none;
  &:hover {
    background-color: #c2e4cb;
    color: #333;
  }
}
</style>
