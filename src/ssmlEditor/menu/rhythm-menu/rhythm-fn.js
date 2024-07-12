import { SlateRange } from "@wangeditor/editor";
import BaseFn from "../base-fn";
import { emitter } from "@/event-bus";

export class RhythmFn extends BaseFn {
  constructor(editor) {
    super(editor);
  }

  isDisabled() {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (SlateRange.isExpanded(selection)) {
      emitter.emit("warn", "不能框选文本");
      return true;
    }

    return false;
  }

  exec(opt) {
    this.editor.restoreSelection();
    if (this.isDisabled()) return;

    const node = {
      type: "ssml-break",
      strength: opt.value,
      remark: opt.label,
      children: [{ text: "" }],
    };

    this.editor.insertNode(node);
  }
}
