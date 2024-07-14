
export default {
  type: 'ssml-prosody',
  elemToHtml: (elem, childrenHtml) => {
    const { remark, contour = '', pitch = '', range = '', rate = '', volume = '' } = elem 
    const html = `<span
          data-w-e-type="ssml-prosody"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-contour="${contour}"
          data-ow-pitch="${pitch}"
          data-ow-range="${range}"
          data-ow-rate="${rate}"
          data-ow-volume="${volume}"
        >${childrenHtml}</span>`
    return html
  },
}
