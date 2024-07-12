import {
  SlateRange,
  DomEditor,
  SlateEditor,
  SlateTransforms,
} from "@wangeditor/editor";
import BaseFn from "../base-fn";
import { emitter } from "@/event-bus";

export class ManagementFn extends BaseFn {
  constructor(editor) {
    super(editor);
  }

  isDisabled() {
    if (super.isDisabled()) return true;
    const { selection } = this.editor;
    if (selection == null) return true;

    if (DomEditor.getSelectedNodeByType(this.editor, "custom-management")) {
      return false;
    }

    if (SlateRange.isCollapsed(selection)) {
      emitter.emit("warn", "请框选句子");
      return true;
    }

    const [currentNode] = SlateEditor.node(this.editor, selection);
    const parentNode = this.editor.getParentNode(currentNode);
    if (!parentNode || !DomEditor.checkNodeType(parentNode, "paragraph")) {
      emitter.emit("warn", "多人配音需要在最外层使用");
      return true;
    }

    return false;
  }

  readContentData() {
    const node = DomEditor.getSelectedNodeByType(
      this.editor,
      "custom-management"
    );
    if (!node) return;
    const managementNode = node;
    const data = managementNode.custom.contentData;
    if (data) {
      return {
        category: data.category,
        name: data.name,
        pitch: data.pitch,
        role: data.role,
        speed: data.speed,
        style: data.style,
      };
    }
  }

  exec(opt, contentData) {
    this.editor.restoreSelection();
    if (this.isDisabled()) return;
    const value = this.getValue();
    if (value == null) return;

    const elem = {
      type: "custom-management",
      custom: { contentData },
      remark: opt.label,
      name: opt.value,
      role: opt.role,
      style: opt.style,
      rate: opt.speed,
      pitch: opt.pitch,
      children: [{ text: value }],
    };
    const node = DomEditor.getSelectedNodeByType(
      this.editor,
      "custom-management"
    );
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
