import { defineStore } from 'pinia'
import { generateDub } from '../api/api'

export const useStore = defineStore('store', {
    state: () => {
        return {
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
        }
    },
    getters: {

    },
    actions: {
        GENERATEDUB() {
            const dubResult = generateDub()
            console.log('GENERATEDUB', dubResult)
        }
    }
})