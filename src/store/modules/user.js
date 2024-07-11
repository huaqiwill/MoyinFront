import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      isPlaying: false,
      currentSong: {},
      currentSongIndex: 0,
      songList: [],
      isShow: false,
      isShowPlayList: false,
      isShowLyric: false,
      isShowComment: false,
      isShowSearch: false,
      isShowMv: false,
      isShowMvList: false,
      isShowMvDetail: false,
      isShowMvPlay: false,
    };
  },
  getters: {},
  actions: {},
});
