import { SlateRange } from "@wangeditor/editor";
import { emitter } from "@/event-bus";
import BaseFn from "../base-fn";
import { readValueMap } from "./data";

export class ReadFn extends BaseFn {
  constructor(editor) {
    super(editor);
  }

  isDisabled() {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (selection == null) return true;
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit("warn", "请框选词或句子");
      return true;
    }

    return false;
  }

  exec(opt) {
    this.editor.restoreSelection();
    if (this.isDisabled()) return;
    const value = this.getValue();
    if (value == null) return;

    const { pitch, rate } = readValueMap[opt.value];

    const node = {
      type: "ssml-prosody",
      remark: opt.label,
      pitch,
      rate,
      children: [{ text: value }],
    };

    this.editor.insertNode(node);
  }
}
