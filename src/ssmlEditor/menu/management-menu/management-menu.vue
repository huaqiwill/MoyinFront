<script setup>
import { BarButton, DragBox } from '@/ssmlEditor/components'
import { onMounted, reactive, ref, shallowRef, onUnmounted, nextTick } from 'vue'
import { useElementBounding } from '@vueuse/core'
import ManagementContent from './management-content.vue'
import { defaultContentData} from './data'
import { ManagementFn } from './management-fn'
import { getEmitter } from '@/ssmlEditor/core/emitter'
import { emitter } from '@/ssmlEditor/event-bus'
import { useEditorStore } from '@/store'

const dragRef = ref()
const menuRef = ref()
const contentRef = ref()
const visible = ref(false)
const fn = shallowRef()
const contentData = reactive(defaultContentData())

const { x, y, height } = useElementBounding(menuRef)

onMounted(() => {
  emitter.on('editor-created', handleEditorCreated)
  nextTick(() => {
    const { editor } = useEditorStore()
    editor && handleEditorCreated(editor)
  })
})

onUnmounted(() => {
  emitter.off('editor-created', handleEditorCreated)
  const { editor } = useEditorStore()
  getEmitter(editor)?.off('ssml-remark-click', handleSSMLRemarkClick)
})

function handleEditorCreated(editor) {
  getEmitter(editor).off('ssml-remark-click', handleSSMLRemarkClick)
  getEmitter(editor).on('ssml-remark-click', handleSSMLRemarkClick)
}

function handleSSMLRemarkClick(editor, elem) {
  if (elem.type === 'custom-management') {
    fn.value = undefined
    handleClick(editor)
  }
}

function show() {
  const call = () => {
    const pot = {
      x: x.value - 200,
      y: y.value + height.value,
    }
    dragRef.value?.setPosition(pot)
    visible.value = true
    contentRef.value?.focus()
  }
  dragRef.value?.withoutAutoClose(call)
}

function hide() {
  visible.value = false
}

function handleClick(editor) {
  fn.value ??= new ManagementFn(editor)
  if (fn.value.isDisabled()) return
  const data = fn.value.readContentData()
  data && Object.assign(contentData, data)
  show()
}

function handleSubmit(opt) {
  fn.value?.exec(opt, { ...contentData })
  hide()
}
</script>

<template>
  <DragBox ref="dragRef" v-model:visible="visible">
    <template #reference>
      <BarButton ref="menuRef" icon="management" @click="handleClick">多人配音</BarButton>
    </template>
    <ManagementContent
      ref="contentRef"
      @submit="handleSubmit"
      :contentData="contentData"
    ></ManagementContent>
  </DragBox>
</template>

<style lang="scss" scoped></style>
