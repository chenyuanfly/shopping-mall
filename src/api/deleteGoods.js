import request from '../utils/request'

export function deleteGoodsAPI(userid, cartid) {
    return request({
        url: "/cart/deleteById?userId=" + userid +
            "&cartId=" + cartid,
        method: 'get',
    })
}