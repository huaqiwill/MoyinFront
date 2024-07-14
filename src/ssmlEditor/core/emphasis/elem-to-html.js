
export default {
  type: 'ssml-emphasis',
  elemToHtml: (elem, childrenHtml) => {
    const { remark, level = 'none' } = elem
    const html = `<span
          data-w-e-type="ssml-emphasis"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-level="${level}"
        >${childrenHtml}</span>`
    return html
  },
}
