import request from 'boot/request'
export function login (query) {
  return request({
    url: '/api/login',
    method: 'get',
    params: query
  })
}
export function register (query) {
  return request({
    url: '/api/register',
    method: 'get',
    params: query
  })
}
export function getUserdata (query) {
  return request({
    url: '/api/getUserdata',
    method: 'get',
    params: query
  })
}
export function setAlertToken (token) {
  return request({
    url: '/api/setAlertToken',
    method: 'get',
    params: token
  })
}
