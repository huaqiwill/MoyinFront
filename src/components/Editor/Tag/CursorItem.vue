<template>
  <div v-if="model" class="cursor" :style="style"></div>
</template>

<script setup>
import { defineModel, onMounted, ref } from "vue";
const model = defineModel({
  type: Boolean,
});

const style = ref("background-color:transparent;");

onMounted(() => {
  let val = false;
  setInterval(() => {
    if (val) {
      style.value = "background-color:transparent;";
      val = false;
    } else {
      style.value = "background-color:red;";
      val = true;
    }
  }, 500);
});
</script>

<style scoped>
.cursor {
  /* background-color: transparent; */
  margin: 10px;
  width: 5px;
  height: 60px;
  background-color: red;
}
</style>
