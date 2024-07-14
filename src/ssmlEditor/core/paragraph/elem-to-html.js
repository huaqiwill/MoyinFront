
export default {
  type: "paragraph",
  elemToHtml: (_elem, childrenHtml) => {
    return `<paragraph data-ow-remark="mekumiao/ssml-editor">${childrenHtml}</paragraph>`;
  },
};
