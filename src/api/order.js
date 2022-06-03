import request from '../utils/request'

export function orderAPI(userid) {
    return request({
        url: "/order/listByUser?userId=" + userid,
        method: 'get',
    })
}