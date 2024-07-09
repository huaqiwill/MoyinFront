import { defineStore } from "pinia";

export const useDubbingStore = defineStore("dubbing", {
  state: () => {
    return {
      // 配音文字
      dubbingText: "",
      // 选中的配音文字
      dubbingSelectedText: "",

      dubbingSelectedIndex: 0,

      dubbingSelectedLength: 0,

      // 编辑器实例
      editorRef: null,
      // 音量，默认为 50
      dubbingVolume: 50,
      //
      quillEditorRef: null,
    };
  },
  getters: {},
  actions: {
    async login() {
      // 登录逻辑
    },
  },
});
