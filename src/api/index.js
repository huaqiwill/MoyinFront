import request from "@/utils/request";

export function moyinCategoryList(){
    return request({
        url: '/moyin/category/list',
        method: 'GET',
        data: {
            text: 'hello world'
        }
    })
}

export function moyinEmotionList(){
    return request({
        url: '/moyin/emotion/list',
        method: 'GET',
        data: {
            text: 'hello world'
        }
    })
}

export function moyinDubbingList() {
    return request({
        url: '/moyin/dubbing/list',
        method: 'GET',
        data: {
            text: 'hello world'
        }
    })
}

export function moyinMemberInfo() {
    return request({
        url: '/moyin/member/info',
        method: 'POST',
        data: {
            text: 'hello world'
        }
    })
}

export function generateDub(){
    return request({
        url: '/moyin/dubbing/list',
        method: 'POST',
        data: {
            text: 'hello world'
        }
    });
}
