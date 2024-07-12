<script setup>
import { ref, shallowRef } from 'vue'
import { BarButton, BarInput, BarPopover } from '@/ssmlEditor/components'
import { MuteFn } from './mute-fn'
import { options } from './data'

const fn = shallowRef()
const visible = ref(false)
const inputRef = ref()

function show() {
  if (visible.value) return
  visible.value = true
}

function hide() {
  if (!visible.value) return
  visible.value = false
}

function handleClick(editor) {
  fn.value ??= new MuteFn(editor)
  if (fn.value.isDisabled()) return
  show()
  inputRef.value?.focus()
}

function handleSubmit(text) {
  hide()
  if (!text) return
  fn.value?.exec({ value: text, label: text })
}
</script>

<template>
  <BarPopover v-model:visible="visible" :width="200">
    <template #reference>
      <BarButton icon="mute" @click="handleClick">插入静音</BarButton>
    </template>
    <div class="d-flex flex-column">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="clickable w-100 fs-6 rounded-1 px-3 py-2"
        @click="handleSubmit(item.value)"
      >
        {{ item.label }}
      </div>
      <BarInput type="text" ref="inputRef" @submit="handleSubmit"></BarInput>
    </div>
  </BarPopover>
</template>

<style lang="scss" scoped></style>
