import {defineStore} from 'pinia'

export const useDubbingStore = defineStore('dubbing', {
    state: () => {
        return {
            // 配音文字
            dubbingText: "",
            // 选中的配音文字
            selectedDubbingText: "",
        }
    },
    getters: {

    },
    actions: {
        async login() {
            // 登录逻辑

        }
    }
})
