import { Quill } from "@vueup/vue-quill";

const Inline = Quill.import("blots/inline");

class HighlightBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.setAttribute(
      "style",
      `background-color: ${value};width:30px;height:30px;border:1px solid red;line-height:60px;`
    );
    return node;
  }

  static formats(node) {
    return node.getAttribute("style").replace("background-color: ", "");
  }

  format(name, value) {
    if (name === "highlight" && value) {
      this.domNode.setAttribute("style", `background-color: ${value}`);
    } else {
      super.format(name, value);
    }
  }
}

HighlightBlot.blotName = "highlight";
HighlightBlot.tagName = "span";
HighlightBlot.className = "highlight";

Quill.register(HighlightBlot);
