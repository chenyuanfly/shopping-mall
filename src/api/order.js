import request from '../utils/request'

export function orderAPI() {
    return request({
        url: "/order/listByUser?userId=250f423a093f41319127a57b9bc0e5a8",
        method: 'get',
    })
}