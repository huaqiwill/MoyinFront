<script setup>
import { defaultAvatar } from "@/config";

defineEmits("click");
defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  avatar: {
    type: String,
  },
  activated: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="speaker-item" @click="$emit('click', value || '')">
    <div class="speaker-head">
      <img
        :src="avatar || defaultAvatar()"
        :class="{ 'border border-warning': activated }"
        class="rounded-circle"
        style="height: 40px"
      />
    </div>
    <div style="font-size: 0.65rem">{{ label }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
