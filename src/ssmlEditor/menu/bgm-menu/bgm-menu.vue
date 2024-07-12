<script setup>
import { BarButton } from '@/ssmlEditor/components'
import { inject, ref, shallowRef } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { DragBox, BarSearch } from '@/ssmlEditor/components'
import { useSSMLStore } from '@/stores'
import { getConfig } from '@/config'

const dragRef = ref()
const menuRef = ref()
const edirorRef = shallowRef()
const editorKey = inject('editorKey')
const ssmlEditorConfig = getConfig(editorKey)
const { bgm } = ssmlEditorConfig

const visible = ref(false)

const { x, y, height } = useElementBounding(menuRef)

async function handleClick(editor) {
  const pot = {
    x: x.value - 300,
    y: y.value + height.value,
  }
  edirorRef.value = editor
  dragRef.value?.setPosition(pot)
  visible.value = true
}

function handleSubmit(opt) {
  const { rootBackgroundaudio } = useSSMLStore()
  rootBackgroundaudio.src = opt.value
  rootBackgroundaudio.remark = opt.label
  visible.value = false
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="bgm" @click="handleClick">配乐</BarButton>
    </template>
    <BarSearch
      :menus="bgm.menus"
      :fetchScene="bgm.fetchScene"
      :fetchStyle="bgm.fetchStyle"
      :fetchData="bgm.fetchData"
      @submit="handleSubmit"
    ></BarSearch>
  </DragBox>
</template>

<style lang="scss" scoped></style>
