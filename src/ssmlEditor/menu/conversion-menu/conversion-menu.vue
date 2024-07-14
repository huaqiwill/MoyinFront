<script setup >
import { BarButton } from '@/ssmlEditor/components'
import { ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { DragBox } from '@/ssmlEditor/components'
import ConversionContent from './conversion-content.vue'
import { ConversionFn } from './conversion-fn'

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef()
const fn = shallowRef()

const visible = ref(false)
const text = ref('')

const { x, y, height } = useElementBounding(menuRef)

function handleClick(editor) {
  fn.value ??= new ConversionFn(editor)
  if (fn.value.isDisabled()) return
  text.value = fn.value.getValue()
  const pot = {
    x: x.value - 200,
    y: y.value + height.value,
  }
  edirorRef.value = editor
  dragRef.value?.setPosition(pot)
  visible.value = true
}

function handleMenuSubmit(opt) {
  fn.value?.exec(opt)
  visible.value = false
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="conversion" @click="handleClick">局部变音</BarButton>
    </template>
    <ConversionContent :text="text" @submit="handleMenuSubmit"></ConversionContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
