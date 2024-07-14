import { handleSSMLRemarkClick, handleUnwrapNodes } from "../helper";

export default {
  type: "moyin-w",
  renderElem: (elem, children, editor) => {
    const ssml_elem = elem;
    return (
      <span className="ssml-wrapper">
        <span
          className="remark"
          contentEditable="false"
          style={{ "background-color": "var(--moyin-w)" }}
          on={{
            mousedown: (event) => event.preventDefault(),
            click: [handleSSMLRemarkClick(editor, ssml_elem)],
          }}
        >
          <span
            className="iconfont icon-roundclosefill"
            on={{ click: [handleUnwrapNodes(editor, ssml_elem)] }}
          ></span>
          <span
            className="data-content"
            attrs={{ "data-content": ssml_elem.remark }}
          ></span>
        </span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ "data-content": "{" }}
          style={{ color: "var(--moyin-w)" }}
        ></span>
        <span>{children}</span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ "data-content": "}" }}
          style={{ color: "var(--moyin-w)" }}
        ></span>
      </span>
    );
  },
};
