import requests from "../utils/requests";

export const generateDub = () => requests({
    url: '/dub',
    method: 'POST',
    data: {
        text: 'hello world'
    }
})