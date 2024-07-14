import { SlateRange } from "@wangeditor/editor";
import BaseFn from "../base-fn";
import { emitter } from "@/ssmlEditor/event-bus";

export class PinyinFn extends BaseFn {
  constructor(editor) {
    super(editor);
  }

  getValue() {
    return super.getValue();
  }

  isDisabled() {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (!selection) return true;
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit("warn", "请框选一个中文字符");
      return true;
    }

    const value = this.getValue();
    if (value.length != 1) {
      emitter.emit("warn", "请框选一个中文字符");
      return true;
    }

    if (!/^[\u4E00-\u9FA5]$/gi.test(value)) {
      emitter.emit("warn", "请框选一个中文字符");
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
      type: "ssml-phoneme",
      alphabet: "sapi",
      ph: opt.value,
      remark: opt.label,
      children: [{ text: value }],
    };

    this.editor.insertNode(node);
  }
}
