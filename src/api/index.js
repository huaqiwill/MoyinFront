import request from "@/utils/request";

// 标签管理
export function moyinTagList() {
  return request({
    url: "/moyin/tag/list",
    method: "GET",
  });
}

// 分类列表
export function moyinCategoryList() {
  return request({
    url: "/moyin/category/list",
    method: "GET",
  });
}

// 语言管理
export function moyinLanguageList() {
  return request({
    url: "/moyin/language/list",
    method: "GET",
  });
}

// 情绪列表
export function moyinEmotionList() {
  return request({
    url: "/moyin/emotion/list",
    method: "GET",
  });
}

// 配音员列表
export function moyinDubbingList(data) {
  return request({
    url: "/moyin/dubbing/list",
    method: "GET",
    data,
  });
}

// 会员信息
export function moyinMemberInfo() {
  return request({
    url: "/moyin/member/info",
    method: "POST",
  });
}
