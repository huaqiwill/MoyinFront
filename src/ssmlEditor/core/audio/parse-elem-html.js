export default {
  selector: 'span[data-w-e-type="ssml-audio"]',
  parseElemHtml: (domElem, children) => {
    const src = domElem.getAttribute("data-ow-src") || "";
    const remark = domElem.getAttribute("data-ow-remark") || "";
    const isVoid = domElem.hasAttribute("data-w-e-is-void");
    return {
      type: "ssml-audio",
      src: src,
      remark: remark,
      children: isVoid ? [{ text: "" }] : children,
    };
  },
};
