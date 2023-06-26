const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/card',
    component: () => import('../components/ThingCard.vue')
  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/NoteList.vue')
      },
      {
        path: '/note/edit/:id',
        component: () => import('../views/NoteEdit.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/note/preview/:id',
        component: () => import('../views/NotePriview.vue')
      },
      {
        path: '/thing',
        component: () => import('../views/Thing.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/alist',
        component: () => import('../views/Alist.vue')
      },
      {
        path: '/info',
        component: () => import('../views/Info.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/ErrorNotFound.vue')
      }
    ]
  }
]

export default routes
