export default {
  type: "ssml-audio",
  elemToHtml: (elem, childrenHtml, editor) => {
    const { remark, src } = elem;
    const isVoid = editor.isVoid(elem) ? "data-w-e-is-void" : "";
    const html = `<span
          data-w-e-type="ssml-audio" ${isVoid}
          data-w-e-is-inline
          data-ow-src="${src}"
          data-ow-remark="${remark}"
        >${childrenHtml}</span>`;
    return html;
  },
};
