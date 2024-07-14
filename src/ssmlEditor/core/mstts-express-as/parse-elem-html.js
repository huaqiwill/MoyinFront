
export default {
  selector: 'span[data-w-e-type="ssml-mstts:express-as"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const style = domElem.getAttribute('data-ow-style') || ''
    const styledegree = domElem.getAttribute('data-ow-styledegree') || ''
    const role = domElem.getAttribute('data-ow-role') || ''
    return {
      type: 'ssml-mstts:express-as',
      style: style,
      remark: remark,
      styledegree: styledegree,
      role: role,
      children: children,
    }
  },
}
