import request from '../utils/request'

export function generateOrderAPI(userid, cartList) {
    return request({
        url: "/order/addCastOrder",
        params: {
            userId: userid,
            cartList: cartList
        },
        method: 'post',
    })
}