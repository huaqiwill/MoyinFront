export default {
  type: "ssml-mstts:express-as",
  elemToHtml: (elem, childrenHtml) => {
    const { remark, style, role = "", styledegree = "" } = elem;
    const html = `<span
          data-w-e-type="ssml-mstts:express-as"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-style="${style}"
          data-ow-styledegree="${styledegree}"
          data-ow-role="${role}"
        >${childrenHtml}</span>`;
    return html;
  },
};
