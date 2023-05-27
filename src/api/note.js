import request from 'boot/request'
export function getAllnotes () {
  return request({
    url: '/api/getAllNotes',
    method: 'get'
  })
}
export function delNote (id) {
  return request({
    url: '/api/delNote',
    method: 'get',
    params: id
  })
}
export function addNote (data) {
  return request({
    url: '/api/addNote',
    method: 'post',
    data
  })
}
export function updateNote (data) {
  return request({
    url: '/api/updateNote',
    method: 'post',
    data
  })
}
export function uploadImage (data) {
  return request({
    url: '/api/uploadImage',
    method: 'post',
    data
  })
}
export function deleteImage (data) {
  return request({
    url: '/api/deleteImage',
    method: 'get',
    params: data
  })
}
export function getNoteList () {
  return request({
    url: '/api/getNoteList',
    method: 'get'
  })
}
