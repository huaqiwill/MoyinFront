import { defineStore } from "pinia";
import { shallowReactive } from "vue";

export const useSSMLStore = defineStore("--editor-ssml", () => {
  const rootVoice = shallowReactive({
    type: "ssml-voice",
    name: "",
    remark: "",
    effect: "",
    children: [],
  });

  const rootBackgroundaudio = shallowReactive({
    type: "ssml-mstts:backgroundaudio",
    src: "",
    remark: "",
    children: [],
  });

  const rootExpressAs = shallowReactive({
    type: "ssml-mstts:express-as",
    style: "",
    role: "",
    remark: "",
    children: [],
  });

  const rootProsody = {
    type: "ssml-prosody",
    remark: "",
    children: [],
  };

  return { rootVoice, rootBackgroundaudio, rootExpressAs, rootProsody };
});
