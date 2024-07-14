import { defineStore } from "pinia";
import { computed, readonly, ref, shallowRef } from "vue";
import { defaultSpeaker } from "@/ssmlEditor/model";
import { useSSMLStore } from "./ssml";
import AudioPlayer from "@/ssmlEditor/menu/conversion-menu/audio-player";
import { serializeToSSML } from "@/ssmlEditor/serialize";
import { sleep } from "@/ssmlEditor/utils";
import { emitter } from "@/ssmlEditor/event-bus";
import { getConfig } from "@/ssmlEditor/config";

export const useTryPlayStore = defineStore("--editor-try-play", () => {
  const ssmlStore = useSSMLStore();
  const _audioPlayer = shallowRef(new AudioPlayer());
  const _speaker = ref(defaultSpeaker());
  const _isLoading = ref(false);

  const speaker = computed(() => readonly(_speaker.value));
  const audioPlayer = computed(() => _audioPlayer.value);
  const isLoading = computed(() => _isLoading.value);

  const setSpeaker = (key, value) => {
    function setter(value) {
      _speaker.value = value;
      ssmlStore.rootVoice.name = value.name;
      emitter.emit("tryplay-speaker-select", value);
    }
    const config = getConfig(key);
    if (config.tryPlay.selectSpeaker) {
      config.tryPlay.selectSpeaker(value, setter);
    } else {
      setter(value);
    }
  };

  const star = async (key, isStar) => {
    const speakerId = _speaker.value.id;
    const config = getConfig(key);
    const resIsStar = await config.tryPlay.fetchStar(speakerId, isStar);
    _speaker.value.isStar = resIsStar;
    emitter.emit("tryplay-speaker-update-star", _speaker.value.id, resIsStar);
  };

  async function play(fetchAudio) {
    if (isLoading.value) {
      _isLoading.value = false;
      audioPlayer.value.cancel();
      return;
    }
    if (audioPlayer.value.playState.value === "playing") {
      audioPlayer.value.pause();
      return;
    }
    try {
      _isLoading.value = true;
      const audio = await fetchAudio(serializeToSSML);
      await audioPlayer.value.load(audio.src);
      await sleep(200);
      if (isLoading.value) {
        _isLoading.value = false;
        audioPlayer.value.play();
      }
    } catch (error) {
      emitter.emit("error", error);
    } finally {
      _isLoading.value = false;
    }
  }

  return { speaker, setSpeaker, star, audioPlayer, isLoading, play };
});
