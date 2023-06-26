import { defineStore, createPinia } from 'pinia'
import { Notify } from 'quasar'
import { addCard, delCard, getCards, updateCard } from 'src/api/progresss'
createPinia()
export const developStore = defineStore('developStore',
  {
    state: () => ({
      headerstatus: '',
      tabstatus: 'undo'
    }),
    getters: {
      getheaderstatus () {
        return this.headerstatus
      },
      gettabstatus () {
        return this.tabstatus
      }
    },
    actions: {
      getCards () {
        return getCards()
          .then(e => {
            Notify.create({
              message: '获取成功',
              type: 'positive'
            })
            return Promise.resolve(e.data.data)
          })
          .catch(e => {
            Notify.create({
              message: '获取失败',
              type: 'warning'
            })
            return Promise.reject()
          })
      },
      delCard (id) {
        return delCard({ id })
          .then(e => {
            Notify.create({
              message: '获取成功',
              type: 'positive'
            })
            return Promise.resolve()
          })
          .catch(e => {
            Notify.create({
              message: '删除失败',
              type: 'warning'
            })
            return Promise.reject()
          })
      },
      updatecard (card) {
        return updateCard(card)
          .then(e => {
            Notify.create({
              message: '修改成功',
              type: 'positive'
            })
            return Promise.resolve()
          })
          .catch(e => {
            Notify.create({
              message: '修改失败',
              type: 'warning'
            })
            return Promise.reject()
          })
      },
      addcard (data) {
        return addCard(data)
          .then(e => {
            Notify.create({
              message: '添加成功:' + e.data,
              type: 'positive'
            })
            return Promise.resolve()
          })
          .catch(e => {
            Notify.create({
              message: '添加失败',
              type: 'warning'
            })
            return Promise.reject()
          })
      },
      changeheaderstatus (name) {
        this.headerstatus = name
      },
      changetabstatus (name) {
        this.tabstatus = name
      }

    }

  })
