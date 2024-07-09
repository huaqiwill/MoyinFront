<template>
  <div v-if="model" class="stress" @click.stop="handleClicked">
    <span class="close" @click.stop="handleClose">x</span>
    <span>{{ name }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from "vue";
const handleClicked = () => {
  alert("重音");
};

const handleClose = () => {
  model.value = false;
};

const model = defineModel({
  type: Boolean,
});

const props = defineProps({
  name: {
    type: String,
    default: "重音",
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
  border-radius: 4px;
  white-space: nowrap; /*强制span不换行*/
  position: relative;

  .close {
    right: -8px;
    top: -8px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    // background-color: red;
    border: 1px solid red;
    position: absolute;
    text-align: center;
    color: #000;
    background-color: #c2e4cb;

    &:hover {
      background-color: red;
      color: #fff;
    }
  }

  // pointer-events: none;
  &:hover {
    background-color: #c2e4cb;
    color: #333;
  }
}
</style>
