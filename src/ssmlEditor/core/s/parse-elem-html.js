export default {
  selector: 'span[data-w-e-type="ssml-s"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    return {
      type: "ssml-s",
      remark: remark,
      children: children,
    };
  },
};
