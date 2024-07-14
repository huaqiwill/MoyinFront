import throttle from "lodash.throttle";
import { AudioPlayer } from "./audio-player";
import {
  handleDeleteNode,
  handleSSMLRemarkClick,
  handleUnwrapNodes,
} from "../helper";

const audioPlayer = new AudioPlayer();

function handlePlay(src) {
  return throttle(async (event) => {
    event.preventDefault();
    await audioPlayer.load(src);
    audioPlayer.play();
  });
}

function handleStop(src) {
  return throttle((event) => {
    event.preventDefault();
    if (audioPlayer.src === src) {
      audioPlayer.stop();
    }
  });
}

export default {
  type: "ssml-audio",
  renderElem: (elem, children, editor) => {
    return children
      ? renderElement(elem, children, editor)
      : renderVoidElement(elem, editor);
  },
};

function renderElement(elem, children, editor) {
  const { remark, src } = elem;
  return (
    <span className="ssml-wrapper">
      <span
        className="remark"
        contentEditable="false"
        style={{ "background-color": "var(--ssml-audio)" }}
        on={{
          mousedown: (event) => event.preventDefault(),
          click: [handleSSMLRemarkClick(editor, elem)],
        }}
      >
        <span
          className="iconfont icon-roundclosefill"
          on={{
            click: [handleUnwrapNodes(editor, elem), handleStop(src)],
          }}
        ></span>
        <span
          className="iconfont icon-play"
          on={{ click: handlePlay(src) }}
        ></span>
        <span
          className="iconfont icon-pause"
          on={{ click: handleStop(src) }}
        ></span>
        <span
          className="data-content"
          attrs={{ "data-content": remark }}
        ></span>
      </span>
      <span
        className="data-content"
        contentEditable="false"
        attrs={{ "data-content": "{" }}
        style={{ color: "var(--ssml-audio)" }}
      ></span>
      <span>{children}</span>
      <span
        className="data-content"
        contentEditable="false"
        attrs={{ "data-content": "}" }}
        style={{ color: "var(--ssml-audio)" }}
      ></span>
    </span>
  );
}

function renderVoidElement(elem, editor) {
  const { remark, src } = elem;
  return (
    <span className="ssml-wrapper" contentEditable="false">
      <span
        className="remark"
        style={{ "background-color": "var(--ssml-audio)" }}
      >
        <span
          className="iconfont icon-roundclosefill"
          on={{
            click: [handleDeleteNode(editor, elem), handleStop(src)],
          }}
        ></span>
        <span
          className="iconfont icon-play"
          on={{ click: handlePlay(src) }}
        ></span>
        <span
          className="iconfont icon-pause"
          on={{ click: handleStop(src) }}
        ></span>
        <span
          className="data-content"
          attrs={{ "data-content": remark }}
        ></span>
      </span>
      <span
        className="iconfont icon-music"
        style={{ color: "var(--ssml-audio)" }}
      ></span>
    </span>
  );
}
