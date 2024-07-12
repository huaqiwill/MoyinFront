import { SlateRange } from "@wangeditor/editor";
import { emitter } from "@/event-bus";
import BaseFn from "../base-fn";

// 音效功能
export class SpecialFn extends BaseFn {
  constructor(editor) {
    super(editor);
  }

  restoreSelection() {
    this.editor.restoreSelection();
  }

  isDisabled() {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (SlateRange.isExpanded(selection)) {
      emitter.emit("warn", "不能框选文字");
      return true;
    }
    return false;
  }

  exec(opt) {
    this.editor.restoreSelection();
    if (this.isDisabled()) return;

    const value = this.getValue();
    if (value == null) return;

    const node = {
      type: "ssml-audio",
      src: opt.value,
      remark: opt.label,
      children: [{ text: "" }],
    };

    this.editor.insertNode(node);
  }
}
