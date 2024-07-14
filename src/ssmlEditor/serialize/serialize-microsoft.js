// 微软SSML序列化
// 已知和已解决的问题:
// 1. prosody标签嵌套会导致整个句子都被最深层的prosody值影响. 解决方法: 限制不可嵌套使用,并且分别给没有设置韵律的句子添加默认韵律

import {
  DomEditor,
  SlateEditor,
  SlateElement,
  SlateNode,
  SlateText,
} from "@wangeditor/editor";
import { useEditorStore, useSSMLStore } from "@/store";
import { convertSoftlyTo5 } from "@/ssmlEditor/utils";

function formatPitch(v) {
  if (!/^-?\d+(\.\d+)?$/.test(v)) return v;
  return `${(0.05 * Number(v) * 100).toFixed(0)}%`;
}

function formatRate(v) {
  if (!/^-?\d+(\.\d+)?$/.test(v)) return v;
  return `${((Number(v) - 1) * 100).toFixed(0)}%`;
}

function formatPinyin(pinyin) {
  return convertSoftlyTo5(pinyin).replace(/([\d])/g, " $1");
}

function escapeText(text) {
  const result = text
    .replaceAll(/[&]/gi, "&amp;")
    .replaceAll(/[<]/gi, "&lt;")
    .replaceAll(/[>]/gi, "&gt;");
  return result;
}

function serializeAudio(node, children) {
  if (children) return `<audio src="${node.src}">${children}</audio>`;
  return `<audio src="${node.src}"/>`;
}

function serializeBreak(node) {
  if (node.time) {
    return `<break time="${node.time}"/>`;
  } else if (node.strength) {
    return `<break strength="${node.strength}"/>`;
  }
  return `<break/>`;
}

function serializeEmphasis(node, children) {
  if (node.level) {
    return `<emphasis level="${node.level}">${children}</emphasis>`;
  }
  return `<emphasis>${children}</emphasis>`;
}

function serializeMsttsExpressAs(node, children) {
  if (!node.style) return children;
  const role = node.role ? ` role="${node.role}"` : "";
  const styledegree = node.styledegree
    ? ` styledegree="${node.styledegree}"`
    : "";
  return `<mstts:express-as style="${node.style}"${role}${styledegree}>${children}</mstts:express-as>`;
}

function serializeMsttsBackgroundaudio(node) {
  if (!node.src) return "";
  const volume = node.volume ? ` volume="${node.volume}"` : "";
  const fadein = node.fadein ? ` fadein="${node.fadein}"` : "";
  const fadeout = node.fadeout ? ` fadeout="${node.fadeout}"` : "";
  return `<mstts:backgroundaudio src="${node.src}"${volume}${fadein}${fadeout}/>`;
}

function serializeMsttsSilence(node) {
  if (!node.attrType || !node.value) return "";
  return `<mstts:silence type="${node.attrType}" value="${node.value}"/>`;
}

function serializeP(_node, children) {
  return `<p>${children}</p>`;
}

function serializePhoneme(node, children) {
  const alphabet = node.alphabet ? ` alphabet="${node.alphabet}"` : "";
  return `<phoneme ph="${formatPinyin(
    node.ph
  )}"${alphabet}>${children}</phoneme>`;
}

function serializeProsody(node, children) {
  if (!node.contour && !node.pitch && !node.range && !node.rate && !node.volume)
    return children;
  const contour = node.contour ? ` contour="${node.contour}"` : "";
  const pitch = node.pitch ? ` pitch="${formatPitch(node.pitch)}"` : "";
  const range = node.range ? ` range="${node.range}"` : "";
  const volume = node.volume ? ` volume="${node.volume}"` : "";
  const rate = node.rate ? ` rate="${formatRate(node.rate)}"` : "";
  return `<prosody${contour}${pitch}${range}${volume}${rate}>${children}</prosody>`;
}

function serializeSayAs(node, children) {
  const interpretAs = node.interpretAs
    ? ` interpret-as="${node.interpretAs}"`
    : "";
  const format = node.format ? ` format="${node.format}"` : "";
  const detail = node.detail ? ` detail="${node.detail}"` : "";
  return `<say-as${interpretAs}${format}${detail}>${children}</say-as>`;
}

function serializeS(_node, children) {
  return `<s>${children}</s>`;
}

function serializeSub(node, children) {
  return `<sub alias="${node.alias}">${children}</sub>`;
}

function serializeVoice(node, children) {
  const effect = node.effect ? ` effect="${node.effect}"` : "";
  return `<voice name="${node.name}${effect}">${children}</voice>`;
}

function serializeSpeak(node, children) {
  return `<speak version="${node.version}" xml:lang="${node["xml:lang"]}" xmlns="${node.xmlns}" xmlns:mstts="${node["xmlns:mstts"]}" xmlns:emo="${node["xmlns:emo"]}">${children}</speak>`;
}

function serializeNode(node) {
  if (SlateText.isText(node)) {
    return escapeText(node.text.trim());
  } else if (SlateElement.isElement(node)) {
    const children = node.children.map((n) => serializeNode(n)).join("");
    const type = DomEditor.getNodeType(node);
    switch (type) {
      case "paragraph":
        return `<p>${children}</p>`;
      case "ssml-speak":
        return serializeSpeak(node, children);
      case "ssml-mstts:backgroundaudio":
        return serializeMsttsBackgroundaudio(node);
      case "ssml-audio":
        return serializeAudio(node, children);
      case "ssml-break":
        return serializeBreak(node);
      case "ssml-emphasis":
        return serializeEmphasis(node, children);
      case "ssml-mstts:express-as":
        return serializeMsttsExpressAs(node, children);
      case "ssml-p":
        return serializeP(node, children);
      case "ssml-phoneme":
        return serializePhoneme(node, children);
      case "ssml-prosody":
        return serializeProsody(node, children);
      case "ssml-s":
        return serializeS(node, children);
      case "ssml-say-as":
        return serializeSayAs(node, children);
      case "ssml-sub":
        return serializeSub(node, children);
      case "ssml-voice":
        return serializeVoice(node, children);
      case "ssml-mstts:silence":
        return serializeMsttsSilence(node);
      default:
        return children;
    }
  }
  return "";
}

function defaultSpeakNode() {
  return {
    type: "ssml-speak",
    version: "1.0",
    "xml:lang": "zh-CN",
    xmlns: "http://www.w3.org/2001/10/synthesis",
    "xmlns:mstts": "http://www.w3.org/2001/mstts",
    "xmlns:emo": "http://www.w3.org/2009/10/emotionml",
    remark: "",
    children: [],
  };
}

/**
 * 将自定义多人配音节点处理为可序列化的voice节点
 * @param editor editor 对象
 * @param customNode 自定义多人配音节点
 * @returns
 */
function customManagmentToVoice(editor, customNode) {
  const voice = {
    type: "ssml-voice",
    remark: "",
    name: customNode.name,
    children: [],
  };
  const silences = createDefaultMsttsSilences();
  const expressAs = {
    type: "ssml-mstts:express-as",
    remark: "",
    style: customNode.style,
    role: customNode.role,
    children: [],
  };

  const prosodyGenter = () => ({
    type: "ssml-prosody",
    remark: "",
    rate: customNode.rate,
    pitch: customNode.pitch,
    children: [],
  });

  voice.children.push(...silences);
  voice.children.push(expressAs);

  function prosodyHandler() {
    const prosody = prosodyGenter();
    expressAs.children.push(prosody);

    function pushNode(node) {
      prosody.children.push(node);
    }

    return { prosody, pushNode };
  }

  let handler;

  for (let i = 0; i < customNode.children.length; i++) {
    const node = customNode.children[i];
    if (SlateText.isText(node) && !node.text.trim()) {
      continue;
    } else if (SlateText.isText(node)) {
      handler ??= prosodyHandler();
      handler.pushNode(node);
      continue;
    } else if (SlateEditor.isVoid(editor, node)) {
      handler = undefined;
      expressAs.children.push(node);
      continue;
    } else {
      const path = DomEditor.findPath(editor, node);
      const [nodeEntity] = SlateEditor.nodes(editor, {
        at: path,
        mode: "lowest",
        voids: false,
        match: (n) => {
          return DomEditor.checkNodeType(n, "ssml-prosody");
        },
      });
      if (nodeEntity) {
        handler = undefined;
        expressAs.children.push(node);
        continue;
      } else {
        handler ??= prosodyHandler();
        handler.pushNode(node);
      }
    }
  }

  return voice;
}

function createDefaultMsttsSilences() {
  return [
    {
      type: "ssml-mstts:silence",
      attrType: "Comma-exact",
      value: "200ms",
      remark: "逗号静音",
      children: [],
    },
    {
      type: "ssml-mstts:silence",
      attrType: "Semicolon-exact",
      value: "200ms",
      remark: "分号静音",
      children: [],
    },
    {
      type: "ssml-mstts:silence",
      attrType: "Enumerationcomma-exact",
      value: "200ms",
      remark: "顿号静音",
      children: [],
    },
    {
      type: "ssml-mstts:silence",
      attrType: "Sentenceboundary-exact",
      value: "200ms",
      remark: "相邻句子间静音",
      children: [],
    },
  ];
}

function createDefaultVoiceHandler() {
  const { rootVoice, rootExpressAs } = useSSMLStore();
  const voice = { ...rootVoice, children: [] };
  const silences = createDefaultMsttsSilences();
  const expressAs = { ...rootExpressAs, children: [] };

  voice.children.push(...silences);
  voice.children.push(expressAs);

  function pushNode(node) {
    expressAs.children.push(node);
  }

  return { voice, pushNode };
}

function createDefaultProsodyHandler(pushToVoice) {
  const { rootProsody } = useSSMLStore();
  const prosody = { ...rootProsody, children: [] };
  pushToVoice(prosody);

  function pushNode(node) {
    prosody.children.push(node);
  }

  return { prosody, pushNode };
}

/**
 * 默认段落停顿
 */
function paragraphBreak() {
  return {
    type: "ssml-break",
    time: "200ms",
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
    .filter((v) => !SlateEditor.isEmpty(editor, v))
    .map((v, i, ls) => {
      const elem = v;
      const list = elem.children;
      if (i < ls.length - 1) return list.concat([paragraphBreak()]);
      return list;
    });
  return [].concat(...arrayList);
}

/**
 * 处理自定义的多人语音标签
 * 1. 多人语音标签已被限制为顶级标签
 * 2. 没有多人语音标签的节点将被合并添加默认语音标签
 */
function wrapVoiceNode(editor) {
  const nodes = mergeParagraphNodes(editor);
  const wrapNodes = [];
  let voiceHandler;
  let prosodyHandler;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    // 跳过空节点
    if (SlateText.isText(node) && !node.text.trim()) continue;
    // 多人语音节点
    if (DomEditor.checkNodeType(node, "custom-management")) {
      if (voiceHandler) {
        wrapNodes.push(voiceHandler.voice);
        voiceHandler = undefined;
        prosodyHandler = undefined;
      }
      wrapNodes.push(customManagmentToVoice(editor, node));
      continue;
    }
    // 默认语音节点
    voiceHandler ??= createDefaultVoiceHandler();
    if (SlateText.isText(node)) {
      prosodyHandler ??= createDefaultProsodyHandler(voiceHandler.pushNode);
      prosodyHandler.pushNode(node);
      continue;
    } else if (SlateEditor.isVoid(editor, node)) {
      prosodyHandler = undefined;
      voiceHandler.pushNode(node);
      continue;
    } else {
      const path = DomEditor.findPath(editor, node);
      const [nodeEntity] = SlateEditor.nodes(editor, {
        at: path,
        mode: "lowest",
        voids: false,
        match: (n) => {
          return DomEditor.checkNodeType(n, "ssml-prosody");
        },
      });

      if (nodeEntity) {
        prosodyHandler = undefined;
        voiceHandler.pushNode(node);
        continue;
      } else {
        prosodyHandler ??= createDefaultProsodyHandler(voiceHandler.pushNode);
        prosodyHandler.pushNode(node);
        continue;
      }
    }
  }
  voiceHandler && wrapNodes.push(voiceHandler.voice);
  return wrapNodes;
}

export default function serializeToSSML() {
  const { editor } = useEditorStore();
  if (!editor) throw Error("没有找到 editor 对象");
  const { rootBackgroundaudio } = useSSMLStore();
  const speak = defaultSpeakNode();
  const backgroundaudio = { ...rootBackgroundaudio };
  speak.children.push(backgroundaudio, ...wrapVoiceNode(editor));
  return serializeNode(speak);
}
