import request from '../utils/request'

export function cartAPI(userid) {
  return request({
    url: "/cart/listByUser?userId=" + userid,
    method: 'get',
  })
}