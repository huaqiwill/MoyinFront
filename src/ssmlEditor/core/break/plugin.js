import { DomEditor } from "@wangeditor/editor";

export default (editor) => {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "ssml-break") return true;
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "ssml-break") return true;
    return isVoid(elem);
  };

  return newEditor;
};
