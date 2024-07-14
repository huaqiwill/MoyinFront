export default {
  type: "moyin-w",
  elemToHtml: (elem, childrenHtml) => {
    const { remark, phoneme = "" } = elem;
    const html = `<span
          data-w-e-type="moyin-w"
          data-w-e-is-inline
          data-ow-remark="${remark}"
          data-ow-phoneme="${phoneme}"
        >${childrenHtml}</span>`;
    return html;
  },
};
