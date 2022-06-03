import request from '../utils/request'

export function generateOrderAPI(userid, cartList) {
    return request({
        url: "/order/addCastOrder?userId=" + userid +
            "&cartList=" + cartList,
        method: 'get',
    })
}