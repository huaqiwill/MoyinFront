import request from "@/utils/request";

// 分类列表
export function moyinCategoryList(){
    return request({
        url: '/moyin/category/list',
        method: 'GET',
        data: {
            text: 'hello world'
        }
    })
}

// 情绪列表
export function moyinEmotionList(){
    return request({
        url: '/moyin/emotion/list',
        method: 'GET',
        data: {
            text: 'hello world'
        }
    })
}

// 配音员列表
export function moyinDubbingList() {
    return request({
        url: '/moyin/dubbing/list',
        method: 'GET',
        data: {
            text: 'hello world'
        }
    })
}

// 会员信息
export function moyinMemberInfo() {
    return request({
        url: '/moyin/member/info',
        method: 'POST',
        data: {
            text: 'hello world'
        }
    })
}


