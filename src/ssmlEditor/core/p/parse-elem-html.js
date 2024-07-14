export default {
  selector: 'span[data-w-e-type="ssml-p"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    return {
      type: "ssml-p",
      remark: remark,
      children: children,
    };
  },
};
