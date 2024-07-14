export default {
  selector: 'span[data-w-e-type="moyin-w"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    const phoneme = domElem.getAttribute("data-ow-phoneme") || "";
    return {
      type: "moyin-w",
      remark: remark,
      phoneme: phoneme,
      children: children,
    };
  },
};
