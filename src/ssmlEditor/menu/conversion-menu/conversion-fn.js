import { SlateRange } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { emitter } from '@/ssmlEditor/event-bus'

export class ConversionFn extends BaseFn {
   constructor(editor) {
    super(editor)
  }

   getValue() {
    return super.getValue()
  }

   isDisabled() {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (selection == null) return true

    if (SlateRange.isCollapsed(selection)) {
      emitter.emit('warn', '请框选要变音的句子')
      return true
    }

    return false
  }

  exec(opt) {
    this.editor.restoreSelection()
    if (this.isDisabled()) return
    const value = this.getValue()
    if (value == null) return

    const node = {
      type: 'ssml-audio',
      remark: opt.label,
      src: opt.value,
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
