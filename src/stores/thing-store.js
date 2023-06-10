import { defineStore } from 'pinia'
import { addThing, delItem, initStart, refreshThings, restartFun, stopFun, updateThing } from 'src/api/thing'
import { noteStore } from 'stores/note-store'
import { userStore } from 'stores/user-store'
import { Notify } from 'quasar'

export const thingStore = defineStore(
  'thingStore',
  {
    state () {

    },
    actions: {
      async refreshThings () {
        const username = userStore().getUsername
        return refreshThings({ username })
          .then(r => {
            return r.data.data
          })
          .catch(e => {
            Notify.create('事务获取失败')
            return Promise.reject()
          })
      },
      async addthing (data) {
        return await addThing(data)
          .then(r => {
            return true
          })
          .catch(e => {
            Notify.create('事务添加失败')
            return Promise.reject()
          })
      },
      async updatething (item) {
        updateThing(item)
          .then(r => {
            Notify.create('事务更新成功')
            return true
          })
          .catch(e => {
            Notify.create('事务更新失败')
            return Promise.reject()
          })
      },
      async initstart () {
        return await initStart()
          .then(r => {
            Notify.create('事务启动完成')
          })
          .catch(e => {
            Notify.create('事务启动失败')
          })
      },
      async stopfun (id) {
        return await stopFun({ id })
          .then(r => {
            Notify.create('事务已停止')
          })
          .catch(e => {
            Notify.create('事务停止失败')
          })
      },
      async restartfun (id) {
        return await restartFun({ id })
          .then(r => {
            Notify.create('事务已启动')
          })
          .catch(e => {
            Notify.create('事务启动失败')
          })
      },
      async delthing (id) {
        return await delItem({ id })
          .then(r => {
            Notify.create('事务已删除')
            return true
          })
          .catch(e => {
            Notify.create('事务删除失败')
            return false
          })
      }

    }
  }
)
