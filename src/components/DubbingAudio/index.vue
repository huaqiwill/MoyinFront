<template>
  <el-card class="box-card" shadow="hover">
    <!-- <div slot="header" class="clearfix">
        <span>音频播放器</span>
    </div> -->
    <div class="audio-container">
      <audio ref="audio" @timeupdate="onTimeUpdate" @ended="onAudioEnded">
        <source :src="audioSrc" type="audio/mpeg" />
        您的浏览器不支持音频元素。
      </audio>
      <div style="display: flex; align-items: center">
        <div class="controls">
          <el-button type="primary" @click="playAudio" v-if="!isPlaying">{{
            isPlayingText
          }}</el-button>
          <el-button type="primary" @click="pauseAudio" v-if="isPlaying">{{
            isPlayingText
          }}</el-button>
        </div>
        <div class="time-display">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
      </div>
      <el-slider
        v-model="currentTime"
        :max="duration"
        @input="onSliderChange"
      ></el-slider>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed, defineComponent } from "vue";

const audio = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const audioSrc = ref("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

const playAudio = () => {
  audio.value.play();
  isPlaying.value = true;
};

const pauseAudio = () => {
  audio.value.pause();
  isPlaying.value = false;
};

const onTimeUpdate = () => {
  currentTime.value = audio.value.currentTime;
  duration.value = audio.value.duration;
};

const onAudioEnded = () => {
  isPlaying.value = false;
  currentTime.value = 0;
};

const onSliderChange = (value) => {
  audio.value.currentTime = value;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
  return formattedTime;
};

let isPlayingText = ref("播放");
isPlayingText = computed(() => {
  return isPlaying.value ? "暂停" : "播放";
});
</script>

<style lang="scss" scoped>
.audio-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.controls {
  display: flex;
  justify-content: center;
  /* margin-bottom: 10px; */
}

.time-display {
  width: 200px;
  margin-left: 30px;
}

.el-slider {
  width: 100%;
}
</style>
