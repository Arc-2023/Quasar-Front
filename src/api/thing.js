import request from 'boot/request'
export function refreshThings (query) {
  return request({
    url: '/api/refreshThings',
    method: 'get',
    params: query
  })
}
export function addThing (query) {
  return request({
    url: '/api/addThing',
    method: 'post',
    data: query
  })
}
export function updateThing (query) {
  return request({
    url: '/api/updateThing',
    method: 'post',
    data: query
  })
}
export function initStart () {
  return request({
    url: '/api/initStart',
    method: 'get'
  })
}
export function stopFun (item) {
  return request({
    url: '/api/pauseItem',
    method: 'get',
    params: item
  })
}
export function restartFun (item) {
  return request({
    url: '/api/startItem',
    method: 'get',
    params: item
  })
}
export function delItem (item) {
  return request({
    url: '/api/delItem',
    method: 'get',
    params: item
  })
}
