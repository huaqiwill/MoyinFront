export default {
  selector: 'span[data-w-e-type="ssml-phoneme"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    const alphabet = domElem.getAttribute("data-ow-alphabet") || "";
    const ph = domElem.getAttribute("data-ow-ph") || "";
    return {
      type: "ssml-phoneme",
      remark: remark,
      alphabet: alphabet,
      ph: ph,
      children: children,
    };
  },
};
