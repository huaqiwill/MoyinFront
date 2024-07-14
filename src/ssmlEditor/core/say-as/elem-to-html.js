export default {
  type: "ssml-say-as",
  elemToHtml: (elem, childrenHtml) => {
    const { remark, interpretAs, detail = "", format = "" } = elem;
    const html = `<span
          data-w-e-type="ssml-say-as"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-interpretAs="${interpretAs}"
          data-ow-detail="${detail}"
          data-ow-format="${format}"
        >${childrenHtml}</span>`;
    return html;
  },
};
