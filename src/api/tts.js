import { request } from "http";

export function tts(params) {}

export function name(params) {}

export function getWords(word) {
  return request({
    url: "/api/tts/tnList",
    data: { word },
  });
}

export function tnList(word) {
  return request({
    url: "/api/tts/tnList",
    data: { word },
  });
}
