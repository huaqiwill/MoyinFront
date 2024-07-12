<script setup>
import { useTryPlayStore } from '@/stores'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { BarButton } from '@/ssmlEditor/components'
import throttle from 'lodash.throttle'
import { getConfig } from '@/config'
import { inject } from 'vue'

defineProps({
  disabled:{
    type:Boolean,
    default:false
  }
})

const tryPlayStore = useTryPlayStore()
const { audioPlayer, play } = tryPlayStore
const playState = audioPlayer.playState
const editorKey = inject('editorKey')
const ssmlEditorConfig = getConfig(editorKey)

const handleClick = throttle(async () => {
  await play(ssmlEditorConfig.tryPlay.play)
})
</script>

<template>
  <BarButton @click="handleClick" :disabled="disabled">
    <template #icon>
      <ElIcon v-if="tryPlayStore.isLoading" class="is-loading">
        <Loading></Loading>
      </ElIcon>
      <span
        v-else-if="playState === 'paused'"
        class="fs-3 iconfont-moyin moyin-icon_play"
      ></span>
      <span v-else class="iconfont icon-pause"></span>
    </template>
    播放
  </BarButton>
</template>

<style lang="scss" scoped></style>
