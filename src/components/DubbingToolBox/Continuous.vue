<template>
  <!-- 连续 -->
  <DubbingButton
    title="连续"
    content="划选数字或符号，点选合适的读法"
    icon="zy"
    @click="handleStress"
  ></DubbingButton>
</template>

<script setup>
import { DubbingButton } from "@/components";
const handleStress = () => {};
</script>

<style lang="scss" scoped></style>
