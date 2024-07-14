export default {
  type: "ssml-phoneme",
  elemToHtml: (elem, childrenHtml) => {
    const { remark, alphabet = "", ph } = elem;
    const html = `<span
          data-w-e-type="ssml-phoneme"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-alphabet="${alphabet}"
          data-ow-ph="${ph}"
        >${childrenHtml}</span>`;
    return html;
  },
};
