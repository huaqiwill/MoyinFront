import { SlateRange } from "@wangeditor/editor";
import BaseFn from "../base-fn";
import { emitter } from "@/ssmlEditor/event-bus";

export class AliasFn extends BaseFn {
  constructor(editor) {
    super(editor);
  }

  isDisabled() {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (selection == null) return true;
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit("warn", "请框选要设置别名的词或句子");
      return true;
    }

    return false;
  }

  exec(opt) {
    this.editor.restoreSelection();
    if (this.isDisabled()) return;

    const value = this.getValue();
    if (value == null) return;

    const elem = {
      type: "ssml-sub",
      remark: opt.value,
      alias: opt.value,
      children: [{ text: value }],
    };

    const node = DomEditor.getSelectedNodeByType(this.editor, "ssml-sub");
    if (node) {
      const partElem = elem;
      delete partElem.children;
      delete partElem.type;
      SlateTransforms.setNodes(this.editor, partElem, {
        at: DomEditor.findPath(this.editor, node),
      });
    } else {
      this.editor.insertNode(elem);
    }
  }
}
