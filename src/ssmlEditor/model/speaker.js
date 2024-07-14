export function defaultSpeaker() {
  return {
    id: "",
    category: "",
    avatar: "",
    isFree: false,
    isStar: false,
    isSupper24K: false,
    roles: [],
    styles: [],
    name: "",
    displayName: "",
  };
}

export function defaultFilterSpeaker() {
  return {
    word: "",
    topFlag: "",
    category: "",
    gender: "",
    tag: "",
  };
}
