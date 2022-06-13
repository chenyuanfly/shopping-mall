import request from '../utils/request'

export function deleteGoodsAPI(userid, cartid) {
    return request({
        url: "/cart/deleteById",
        params: {
            userId: userid,
            cartId: cartid
        },
        method: 'get',
    })
}