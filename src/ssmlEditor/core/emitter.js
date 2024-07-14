export function getEmitter(editor) {
  if (!editor) return undefined;
  return {
    emit: editor.emit,
    off: editor.off,
    on: editor.on,
    once: editor.once,
  };
}
