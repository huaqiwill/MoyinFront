export default {
  type: "paragraph",
  renderElem: (_elem, children, _editor) => {
    return <p className="ssml-wrapper">{children}</p>;
  },
};
