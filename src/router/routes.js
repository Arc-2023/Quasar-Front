
const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('../views/Person.vue')
      },
      {
        path: '/note',
        component: () => import('../views/Note.vue')
      },
      {
        path: '/thing',
        component: () => import('../views/Thing.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/ErrorNotFound.vue')
      }
    ]
  }
]

export default routes
