import { defaultAudioInfo } from "@/ssmlEditor/menu/conversion-menu/data";
import { defaultRecentUsageSpeaker } from "@/ssmlEditor/menu/management-menu/data";
import { emitter } from "@/ssmlEditor/event-bus";
import mergeWith from "lodash.mergewith";

function resolveList() {
  return () => Promise.resolve([]);
}

function defaultSSMLEditorConfig() {
  return {
    animation: { zoom: true, grayscale: true },
    editorConfig: {
      placeholder: "请输入内容...",
      autoSave: true,
      autoSaveWait: 5000,
    },
    handleWarn: (message) => console.warn(message),
    handleError: (error) => console.error(error),
    pinyin: {},
    english: { fetchData: resolveList() },
    bgm: {
      menus: [
        { label: "默认音效", value: "" },
        { label: "自定义音效", value: "custom" },
        { label: "最近音效", value: "history" },
      ],
      fetchScene: resolveList(),
      fetchStyle: resolveList(),
      fetchData: resolveList(),
    },
    special: {
      menus: [
        { label: "默认音效", value: "" },
        { label: "自定义音效", value: "custom" },
        { label: "最近音效", value: "history" },
      ],
      fetchScene: resolveList(),
      fetchStyle: resolveList(),
      fetchData: resolveList(),
    },
    conversion: {
      timeoutMilliseconds: 20000,
      audioUpload: () => Promise.resolve(defaultAudioInfo()),
      transfer: () => Promise.resolve(defaultAudioInfo()),
      fetchSpeaker: resolveList(),
    },
    management: {
      recordRecentUsage: () =>
        Promise.resolve < RecentUsageSpeaker > defaultRecentUsageSpeaker(),
      fetchRecentUsage: resolveList(),
      deleteRecentUsage: () => Promise.resolve(),
    },
    tryPlay: {
      play: () => Promise.resolve(defaultAudioInfo()),
      fetchData: resolveList(),
      featchTag: resolveList(),
      fetchStar: () => Promise.resolve(true),
      gender: [
        { label: "全部", value: "" },
        { label: "男声", value: "Male" },
        { label: "女声", value: "Female" },
      ],
      topFlag: [
        { label: "热榜", value: "" },
        { label: "SVIP", value: "SVIP" },
        { label: "付费", value: "付费" },
      ],
      category: [
        { label: "常用", value: "常用" },
        { label: "已购", value: "已购" },
        { label: "收藏", value: "收藏" },
        { label: "我的", value: "我的" },
      ],
    },
  };
}

function mergeSSMLEditorConfig(dest, src) {
  return mergeWith(dest, src, (destValue, srcValue) => {
    if (Array.isArray(destValue) && Array.isArray(srcValue)) return srcValue;
  });
}

const configList = {};

export function setConfig(key, partConfig) {
  if (configList[key]) return;
  const defaultConfig = defaultSSMLEditorConfig();
  const ssmlEditorConfig = partConfig
    ? mergeSSMLEditorConfig(defaultConfig, partConfig)
    : defaultConfig;
  emitter.on("error", ssmlEditorConfig.handleError);
  emitter.on("warn", ssmlEditorConfig.handleWarn);
  configList[key] = ssmlEditorConfig;
}

export function getConfig(key) {
  return configList[key];
}
