export default {
  selector: 'span[data-w-e-type="ssml-say-as"]',
  parseElemHtml: (domElem, children) => {
    const remark = domElem.getAttribute("data-ow-remark") || "";
    const interpretAs = domElem.getAttribute("data-ow-interpretAs") || "";
    const format = domElem.getAttribute("data-ow-format") || "";
    const detail = domElem.getAttribute("data-ow-detail") || "";
    return {
      type: "ssml-say-as",
      remark: remark,
      interpretAs: interpretAs,
      detail: detail,
      format: format,
      children: children,
    };
  },
};
