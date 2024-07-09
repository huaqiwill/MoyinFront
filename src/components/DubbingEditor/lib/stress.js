import { Quill } from "@vueup/vue-quill";

const Inline = Quill.import("blots/inline");

class CustomInlineBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.setAttribute(
      "style",
      `width: 100px; height: 50px; background-color: lightblue;user-select:none;padding:5px;border-radius:5px;`
    );
    node.setAttribute("data-value", value);
    node.setAttribute("contenteditable", "false"); // 设置为可编辑
    return node;
  }

  static value(node) {
    return node.getAttribute("data-value");
  }
}

CustomInlineBlot.blotName = "custom-inline";
CustomInlineBlot.tagName = "span"; // 使用 span 元素或其他适合的元素

Quill.register(CustomInlineBlot);
