import request from 'boot/request'
export function getCards () {
  return request({
    url: '/api/getCards',
    method: 'get'
  })
}
export function delCard (id) {
  return request({
    url: '/api/delCard',
    method: 'get',
    params: id
  })
}
export function updateCard (card) {
  return request({
    url: '/api/updateCard',
    method: 'post',
    data: card
  })
}
export function addCard (card) {
  return request({
    url: '/api/addCard',
    method: 'post',
    data: card
  })
}
