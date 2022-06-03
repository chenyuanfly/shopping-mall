import request from '../utils/request'

export function insertGoodsAPI(userid, goodsid, num, price) {
    return request({
        url: "/cart/add?userId=" + userid +
            "&goodsId=" + goodsid +
            "&num=" + num +
            "&price=" + price,
        method: 'get',
    })
}