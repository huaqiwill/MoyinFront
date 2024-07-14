<script setup>
import { shallowRef } from "vue";
import { BarButton } from "@/ssmlEditor/components";
import { ContinuousFn } from "./continuous-fn";

const fn = shallowRef();

function handleClick(editor) {
  fn.value ??= new ContinuousFn(editor);
  if (fn.value.isDisabled()) return;
  fn.value.exec();
}
</script>

<template>
  <BarButton icon="continuous" @click="handleClick">连读</BarButton>
</template>

<style lang="scss" scoped></style>
