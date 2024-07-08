<template>
  <span class="word">{{ word }} </span>
</template>

<script setup>
const props = defineProps({
  word: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
