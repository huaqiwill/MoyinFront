import { getEmitter } from "./emitter";
import {
  SlateRange,
  SlateEditor,
  SlateTransforms,
  SlatePath,
  DomEditor,
} from "@wangeditor/editor";
import throttle from "lodash.throttle";

export function selectionTrimEnd(editor) {
  const { selection } = editor;

  if (selection) {
    const [start, end] = SlateRange.edges(selection);
    const wordRange = SlateEditor.range(editor, start, end);
    const wordText = SlateEditor.string(editor, wordRange);

    const trimmedText = wordText.trimEnd();

    // 如果选中的是一个完整的单词（不包含末尾空格），则更新选区
    if (trimmedText !== wordText) {
      const offset = wordText.length - trimmedText.length;
      const newEnd = { ...end, offset: end.offset - offset };
      const newSelection = { ...selection, anchor: start, focus: newEnd };

      SlateTransforms.select(editor, newSelection);
    }
  }
}

export function insertNodeSpace(editor, range) {
  SlateEditor.withoutNormalizing(editor, () => {
    const startPoint = SlateEditor.start(editor, range);
    const endPoint = SlateEditor.end(editor, range);
    SlateTransforms.insertText(editor, " ", { at: startPoint });
    SlateTransforms.insertText(editor, " ", {
      at: { path: endPoint.path, offset: endPoint.offset + 1 },
    });
    SlateTransforms.select(editor, {
      anchor: { path: startPoint.path, offset: startPoint.offset + 1 },
      focus: { path: endPoint.path, offset: endPoint.offset + 1 },
    });
  });
}

export function removeNodeSpace(editor, path) {
  SlateEditor.withoutNormalizing(editor, () => {
    const startPoint = SlateEditor.before(editor, path);
    const endPoint = SlateEditor.after(editor, path);
    if (!startPoint || !endPoint) return;
    const startRange = {
      anchor: { path: startPoint.path, offset: startPoint.offset - 1 },
      focus: { path: startPoint.path, offset: startPoint.offset },
    };
    const endRange = {
      anchor: { path: endPoint.path, offset: endPoint.offset },
      focus: { path: endPoint.path, offset: endPoint.offset + 1 },
    };
    if (SlateEditor.string(editor, startRange) === " ") {
      SlateTransforms.delete(editor, { at: startRange });
    }
    if (SlateEditor.string(editor, endRange) === " ") {
      SlateTransforms.delete(editor, { at: endRange });
    }
  });
}

export function handleDeleteNode(editor, elem) {
  return throttle((event) => {
    event.preventDefault();
    const path = DomEditor.findPath(editor, elem);
    SlateTransforms.delete(editor, { at: path });
  });
}

export function handleUnwrapNodes(editor, elem) {
  return throttle((event) => {
    event.preventDefault();
    const path = DomEditor.findPath(editor, elem);
    removeNodeSpace(editor, path);
    SlateTransforms.unwrapNodes(editor, { at: path });
  });
}

export function handleSSMLRemarkClick(editor, elem) {
  return throttle((event) => {
    event.preventDefault();
    if (!editor.isFocused()) editor.focus();
    editor.select(DomEditor.findPath(editor, elem));
    getEmitter(editor).emit("ssml-remark-click", editor, elem);
  });
}
