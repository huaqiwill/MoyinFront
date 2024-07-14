
export default {
  selector: 'span[data-w-e-type="ssml-prosody"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute('data-ow-remark') || ''
    const contour = domElem.getAttribute('data-ow-contour') || ''
    const pitch = domElem.getAttribute('data-ow-pitch ') || ''
    const range = domElem.getAttribute('data-ow-range') || ''
    const rate = domElem.getAttribute('data-ow-rate') || undefined
    const volume = domElem.getAttribute('data-ow-volume') || ''
    return {
      type: 'ssml-prosody',
      remark: remark,
      contour: contour,
      pitch: pitch,
      range: range,
      rate: rate,
      volume: volume,
      children: children,
    }
  },
}
