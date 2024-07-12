import { SlateEditor } from "@wangeditor/editor";
import { emitter } from "@/event-bus";

export default class BaseFn {
  constructor(editor) {
    this.editor = editor;
  }

  getValue() {
    const { selection } = this.editor;
    if (selection == null) return "";
    return SlateEditor.string(this.editor, selection);
  }

  isDisabled() {
    const { selection } = this.editor;
    if (selection == null) {
      this.editor.restoreSelection();
      if (this.editor.selection == null) {
        emitter.emit("warn", "未选中编辑器");
        return true;
      }
    }
    return false;
  }

  exec(opt, ...args) {}
}
