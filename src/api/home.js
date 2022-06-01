import request from '../utils/request'

export function homeAPI() {
    return request({
        url: "/goods/list",
        method: 'get',
    })
}