import { jsx } from "snabbdom";
import { SlateElement } from "@wangeditor/editor";
import { handleSSMLRemarkClick, handleUnwrapNodes } from "../helper";

export default {
  type: "ssml-sub",
  renderElem: (elem, children, editor) => {
    const ssml_elem = elem;
    return (
      <span className="ssml-wrapper">
        <span
          className="remark"
          contentEditable="false"
          style={{ "background-color": "var(--ssml-sub)" }}
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
          style={{ color: "var(--ssml-sub)" }}
        ></span>
        <span>{children}</span>
        <span
          className="data-content"
          contentEditable="false"
          attrs={{ "data-content": "}" }}
          style={{ color: "var(--ssml-sub)" }}
        ></span>
      </span>
    );
  },
};
