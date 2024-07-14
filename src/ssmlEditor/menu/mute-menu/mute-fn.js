import { SlateRange } from "@wangeditor/editor";
import { emitter } from "@/ssmlEditor/event-bus";
import BaseFn from "../base-fn";

export class MuteFn extends BaseFn {
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
      time: opt.value,
      remark: opt.label,
      children: [{ text: "" }],
    };

    this.editor.insertNode(node);
  }
}
