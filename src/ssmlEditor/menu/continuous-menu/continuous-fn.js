import { SlateRange } from '@wangeditor/editor'
import BaseFn from '../base-fn'
import { emitter } from '@/ssmlEditor/event-bus'

export class ContinuousFn extends BaseFn {
   constructor(editor) {
    super(editor)
  }

   isDisabled() {
    if (super.isDisabled()) return true
    const { selection } = this.editor
    if (!selection) return true
    if (SlateRange.isCollapsed(selection)) {
      emitter.emit('warn', '请框选要连读的词或句子')
      return true
    }

    const value = this.getValue()
    if (value.length < 2) {
      emitter.emit('warn', '请框选至少2个字符')
      return true
    }

    return false
  }

   exec() {
    if (this.isDisabled()) return

    const value = this.getValue()
    if (value == null) return

    const node = {
      type: 'ssml-prosody',
      rate: 'medium',
      remark: '连读',
      children: [{ text: value }],
    }

    this.editor.insertNode(node)
  }
}
