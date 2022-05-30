import request from '../utils/request'

export function registerAPI(username, againpassword) {
    return request({
      url: "/user/register?name=" + username + "&password=" + againpassword,
      method: 'get',
    })
}