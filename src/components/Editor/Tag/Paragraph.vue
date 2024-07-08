<template>
  <p class="paragraph">
    <Word v-for="word in paragraph" :word="word" />
  </p>
</template>

<script setup>
import Word from "./Word.vue";
import { defineProps } from "vue";

const props = defineProps({
  paragraph: {
    type: String,
    default: "",
  },
});

const paragraphArray = Array.form(props.paragraph);
</script>

<style lang="scss" scoped>

</style>
