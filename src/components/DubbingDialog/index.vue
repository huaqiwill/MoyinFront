<template>
  <div class="dubbing-dialog__modal">
    <div class="dubbing-dialog" v-if="visible">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from "vue";
const visible = defineModel({ type: Boolean, default: false });
</script>

<style lang="scss" scoped>
.dubbing-dialog {
  .dubbing-dialog__modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: red;
  padding: 10px;
}
</style>
