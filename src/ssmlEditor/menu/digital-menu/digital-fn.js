import { SlateEditor, SlateRange } from "@wangeditor/editor";
import { emitter } from "@/ssmlEditor/event-bus";
import BaseFn from "../base-fn";

export class DigitalFn extends BaseFn {
  constructor(editor) {
    super(editor);
  }

  isDisabled() {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit("warn", "请框选纯数字");
      return true;
    }

    const value = SlateEditor.string(this.editor, selection);
    if (value.length <= 0) return true;

    if (Number.isNaN(Number(value))) {
      emitter.emit("warn", "请框选纯数字");
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
      type: "ssml-say-as",
      interpretAs: opt.value,
      remark: opt.label,
      children: [{ text: value }],
    };

    this.editor.insertNode(node);
  }
}
