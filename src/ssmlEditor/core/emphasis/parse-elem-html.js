export default {
  selector: 'span[data-w-e-type="ssml-emphasis"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    const level = domElem.getAttribute("data-ow-level") || "";
    return {
      type: "ssml-emphasis",
      remark: remark,
      level: level,
      children: children,
    };
  },
};
