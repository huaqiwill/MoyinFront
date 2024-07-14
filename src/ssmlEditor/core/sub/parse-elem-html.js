export default {
  selector: 'span[data-w-e-type="ssml-sub"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    const alias = domElem.getAttribute("data-ow-alias") || "";
    return {
      type: "ssml-sub",
      remark: remark,
      alias: alias,
      children: children,
    };
  },
};
