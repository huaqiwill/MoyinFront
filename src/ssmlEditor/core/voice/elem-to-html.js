export default {
  type: "ssml-voice",
  elemToHtml: (elem, childrenHtml) => {
    const { remark, name, effect = "" } = elem;
    const html = `<span
          data-w-e-type="ssml-voice"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-name="${name}"
          data-ow-effect="${effect}"
        >${childrenHtml}</span>`;
    return html;
  },
};
