import request from "@/utils/request";
import axios from "axios";

export function tts(data) {
  return request({
    url: "/moyin/tts",
    method: "POST",
    data,
  });
}

export function name(params) {}

export function getWords(word) {
  return request({
    url: "/moyin/tts/tnList",
    method: "GET",
    data: { word },
  });
}

export function tnList(word) {
  return request({
    url: "/moyin/tts/tnList",
    method: "GET",
    data: { word },
  });
}

export function downloadAudio(url) {
  return axios({
    url: "/dev-api/moyin/tts/audition/" + url,
    method: "GET",
  });
}

export function ttsRecordList(params) {
  return request({
    url: "/moyin/tts/ttsRecordList",
    method: "GET",
    params,
  });
}

export function ttsRecordDelete(id) {
  return request({
    url: "/moyin/tts/ttsRecordDelete/" + id,
    method: "DELETE",
  });
}
