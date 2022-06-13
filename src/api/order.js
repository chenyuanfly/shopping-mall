import request from '../utils/request'

export function orderAPI(userid) {
    return request({
        url: "/order/listByUser",
        params: {
            userId: userid,
        },
        method: 'get',
    })
}