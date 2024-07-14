export default {
  type: "ssml-s",
  elemToHtml: (elem, childrenHtml) => {
    const { remark } = elem;
    const html = `<span
          data-w-e-type="ssml-s"
          data-w-e-is-inline
          data-ow-remark="${remark}"
        >${childrenHtml}</span>`;
    return html;
  },
};
