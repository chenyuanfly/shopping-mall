import request from '../utils/request'

export function loginAPI(username, password) {
    return request({
      url: "/user/login?name=" + username + "&password=" + password,
      method: 'get',
    })
}