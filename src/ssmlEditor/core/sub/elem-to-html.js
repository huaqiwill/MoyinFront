export default {
  type: "ssml-sub",
  elemToHtml: (elem, childrenHtml) => {
    const { remark, alias } = elem;
    const html = `<span
          data-w-e-type="ssml-sub"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-alias="${alias}"
        >${childrenHtml}</span>`;
    return html;
  },
};
