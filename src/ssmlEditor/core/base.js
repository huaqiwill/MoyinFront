
export type EmptyText = { text: '' }

export interface SSMLBaseElement extends SlateElement {
  type: SSMLElementType
  remark: string
}
