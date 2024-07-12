import axios from "axios";

export function getSpeakerEmotionList() {
  return axios({
    url: "https://openapi.mobvoi.com/apis/tts-web-api/v1/speaker/getSpeakerEmotionList",
    method: "GET",
  }).then((res) => res.data);
}

export function getStoreSearchCriteria() {
  return axios({
    url: "https://openapi.mobvoi.com/apis/tts-web-api/v1/storeSpeakerV2/getStoreSearchCriteria",
    method: "GET",
  }).then((res) => res.data);
}

export function searchSpeakers() {
  return axios({
    url: "https://openapi.mobvoi.com/open-apis/speaker/searchSpeakers?keyWord=&domainId=&emotion=&specificLanguage=&gender=&age=&vipAuth=&sort=0&mainEmotion=&pageSize=30&pageNum=1",
    method: "GET",
  }).then((res) => res.data);
}

export function getWords(word) {
  axios({
    url: "https://voice-maker-pc-nodetts.moyin.com/tts/getWords?lang=zh-cn&word=%E7%9A%84&ww_token=1581ca2346e72c2a2bd3f6a1b72e67c0",
    method: "GET",
  });
}

export function tnList(word) {
  axios({
    url: "https://voice-maker-pc-nodetts.moyin.com/tts/tnList?word=1&ww_token=1581ca2346e72c2a2bd3f6a1b72e67c0",
    methods: "GET",
  });
}
