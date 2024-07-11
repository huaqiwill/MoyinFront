import request from '@/utils/request'

export function tts(params) {}

export function name(params) {}

export function getWords(word) {
  return request({
    url: "/moyin/tts/tnList",
    data: { word },
  });
}

export function tnList(word) {
  return request({
    url: "/moyin/tts/tnList",
    data: { word },
  });
}

export function downloadAudio(url) {
  return request({
    url: "/moyin/tts/audition/" + url,
  });
}
