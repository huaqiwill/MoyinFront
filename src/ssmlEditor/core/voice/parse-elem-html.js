export default {
  selector: 'span[data-w-e-type="ssml-voice"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    const name = domElem.getAttribute("data-ow-name") || "";
    const effect = domElem.getAttribute("data-ow-effect") || "";
    return {
      type: "ssml-voice",
      remark: remark,
      name: name,
      effect: effect,
      children: children,
    };
  },
};
