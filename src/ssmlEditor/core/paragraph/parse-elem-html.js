export default {
  selector: "paragraph",
  parseElemHtml: (_domElem, children) => {
    return {
      type: "paragraph",
      children: children,
    };
  },
};
