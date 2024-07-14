import "@wangeditor/editor/dist/css/style.css";
import "highlight.js/styles/atom-one-dark.css";
import "./assets/main.scss";

import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("xml", xml);

export * from "./view";
export * from "./model";
export * from "./config";
export * from "./utils";
export * from "./serialize";
export * from "./event-bus";
