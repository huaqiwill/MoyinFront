export default {
  type: "ssml-p",
  elemToHtml: (elem, childrenHtml) => {
    const { remark } = elem;
    const html = `<span
          data-w-e-type="ssml-p"
          data-w-e-is-inline
          data-ow-remark="${remark}"
        >${childrenHtml}</span>`;
    return html;
  },
};
