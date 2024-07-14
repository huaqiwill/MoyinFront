import {
  DomEditor,
  SlateEditor,
  SlateElement,
  SlateNode,
  SlateText,
} from "@wangeditor/editor";
import { useEditorStore, useSSMLStore } from "@/store";
import { convertSoftlyTo5 } from "@/ssmlEditor/utils";

function formatPinyin(pinyin) {
  return convertSoftlyTo5(pinyin);
}

function serializeBreak(node) {
  if (node.time) {
    return `<break time="${node.time}"/>`;
  } else if (node.strength) {
    switch (node.strength) {
      case "x-weak":
        return `<break time="200ms"/>`;
      case "weak":
        return `<break time="300ms"/>`;
      case "medium":
        return `<break time="500ms"/>`;
      case "strong":
        return `<break time="700ms"/>`;
      case "x-strong":
        return `<break time="1000ms"/>`;
      default:
        return `<break time="200ms"/>`;
    }
  }
  return `<break/>`;
}

function serializePhoneme(node, children) {
  if (!node.ph) return children;
  return `<p phoneme="${formatPinyin(node.ph)}">${children}</phoneme>`;
}

function serializeProsody(node, children) {
  if (!node.contour && !node.pitch && !node.range && !node.rate && !node.volume)
    return children;
  const contour = node.contour ? ` contour="${node.contour}"` : "";
  const pitch = node.pitch ? ` pitch="${node.pitch}"` : "";
  const range = node.range ? ` range="${node.range}"` : "";
  const volume = node.volume ? ` volume="${node.volume}"` : "";
  const rate = node.rate ? ` rate="${node.rate}"` : "";
  return `<prosody${contour}${pitch}${range}${volume}${rate}>${children}</prosody>`;
}

function serializeSayAs(node, children) {
  if (!node.interpretAs) return children;
  const interpretAs =
    node.interpretAs === "cardinal"
      ? "value"
      : node.interpretAs === "characters"
      ? "digits"
      : node.interpretAs;
  return `<say-as interpret-as="${interpretAs}">${children}</say-as>`;
}

function serializeMoyinW(node, children) {
  const phoneme = node.phoneme ? ` phoneme="${node.phoneme}"` : "";
  return `<w${phoneme}>${children}</w>`;
}

function serializeSub(node, children) {
  return `<sub alias=${node.alias}>${children}</sub>`;
}

function serializeSpeak(node, children) {
  return `<speak version="${node.version}" xml:lang="${node["xml:lang"]}" xmlns="${node.xmlns}">${children}</speak>`;
}

function serializeNode(node) {
  if (SlateText.isText(node)) {
    return node.text.trim();
  } else if (SlateElement.isElement(node)) {
    const children = node.children.map((n) => serializeNode(n)).join("");
    const type = DomEditor.getNodeType(node);
    switch (type) {
      case "ssml-speak":
        return serializeSpeak(node, children);
      case "ssml-break":
        return serializeBreak(node);
      case "ssml-phoneme":
        return serializePhoneme(node, children);
      case "ssml-prosody":
        //@ts-ignore
        if (node.remark == "连读") {
          return serializeMoyinW({ ...node, type: "moyin-w" }, children);
        }
        return serializeProsody(node, children);
      case "ssml-say-as":
        return serializeSayAs(node, children);
      case "ssml-sub":
        return serializeSub(node, children);
      case "moyin-w":
        return serializeMoyinW(node, children);
      default:
        return children;
    }
  }
  return "";
}

function defaultSpeakNode() {
  return {
    type: "ssml-speak",
    remark: "",
    version: "1.0",
    "xml:lang": "zh-CN",
    xmlns: "http://www.w3.org/2001/10/synthesis",
    "xmlns:mstts": "",
    "xmlns:emo": "",
    children: [],
  };
}

/**
 * 默认段落停顿
 */
function paragraphBreak() {
  return {
    type: "ssml-break",
    strength: "medium",
    children: [{ text: "" }],
    remark: "paragraphBreak",
  };
}

/**
 * 合并段落,并添加停顿
 * @param editor IDomEditor对象
 * @returns 合并后的节点
 */
function mergeParagraphNodes(editor) {
  const arrayList = editor.children
    .filter((v) => DomEditor.checkNodeType(v, "paragraph"))
    .filter((v) => SlateEditor.isEmpty(editor, v))
    .map((v, i, ls) => {
      const elem = v;
      const list = elem.children;
      if (i < ls.length - 1) return list.concat([paragraphBreak()]);
      return list;
    });
  return [].concat(...arrayList);
}

function createDefaultSpeakDataHandler(pushParent) {
  const { rootVoice, rootExpressAs, rootProsody } = useSSMLStore();
  const speakData = {
    name: rootVoice.name,
    role: rootExpressAs.role || "",
    style: rootExpressAs.style,
    speed: rootProsody.rate || "1",
    pitch: rootProsody.pitch || "0",
    ssml: "",
  };
  const speakNode = defaultSpeakNode();

  pushParent(speakData);

  function pushNode(node) {
    speakNode.children.push(node);
  }

  function serialize() {
    speakData.ssml = serializeNode(speakNode);
  }

  return { pushNode, serialize };
}

function customManagmentToSpeakData(customNode) {
  const speakNode = defaultSpeakNode();
  speakNode.children = customNode.children;
  const speakSSML = serializeNode(speakNode);
  return {
    name: customNode.name,
    role: customNode.role,
    style: customNode.style,
    speed: customNode.rate,
    pitch: customNode.pitch,
    ssml: speakSSML,
  };
}

function converToSpeakDataList(editor) {
  const nodes = mergeParagraphNodes(editor);
  const list = [];
  let handler;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    // 跳过空节点
    if (SlateText.isText(node) && !node.text.trim()) continue;
    // 多人语音节点
    if (DomEditor.checkNodeType(node, "custom-management")) {
      handler?.serialize();
      handler = undefined;
      list.push(customManagmentToSpeakData(node));
      continue;
    }
    handler ??= createDefaultSpeakDataHandler((item) => list.push(item));
    handler.pushNode(node);
  }
  handler?.serialize();
  return list;
}

export function serializeToSpeakDataList() {
  const { editor } = useEditorStore();
  if (!editor) throw Error("没有找到 editor 对象");
  const speaks = converToSpeakDataList(editor);
  return speaks;
}

export default function serializeToSSML() {
  const list = serializeToSpeakDataList();
  function speakDataToXML(data) {
    return `<with name="${data.name}" role="${data.role}" style="${data.style}" speed="${data.speed}" pitch="${data.pitch}">${data.ssml}</with>`;
  }
  const ssml = list.map((v) => speakDataToXML(v)).join("");
  return `<ssml>${ssml}</ssml>`;
}
