<template>
    <div id="app">
        <el-button @click="openLoading">开启 Loading</el-button>
        <el-button @click="closeLoading">关闭 Loading</el-button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

export default defineComponent({
    components: {
        ElButton,
    },
    methods: {
        openLoading() {
            const loading = this.$loading({
                lock: true, // 是否锁定背景滚动
                text: '加载中...', // 显示在加载图标下方的加载文案
                spinner: 'el-icon-loading', // 自定义加载图标类名
                background: 'rgba(0, 0, 0, 0.7)', // 遮罩层背景色
            });

            // 模拟异步操作，3秒后关闭 loading
            setTimeout(() => {
                loading.close();
            }, 3000);
        },
        closeLoading() {
            this.$loading().close(); // 关闭全局 loading
        },
    },
});
</script>

<style scoped>
/* #app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
} */
</style>