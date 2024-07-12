import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "@/router";
import "virtual:svg-icons-register";

// element plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// Arco
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

import "@mekumiao/ssml-editor/dist/style.css";

import SSMLEditor from "@mekumiao/ssml-editor";

import "@/assets/styles/style.css";

const pinia = createPinia();
const app = createApp(App);

//
app.use(SSMLEditor);
app.use(router);
app.use(ArcoVue);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
