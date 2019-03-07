
const routes = [
  {
    path: '/auth',
    component: () => import('../layouts/Auth.vue')
  }, {
    path: '/app',
    component: () => import('../layouts/App.vue'),
    children: [
      {
        path: ':id',
        props: true,
        component: () => import('../components/Chat.vue')
      }
    ]
  }, {
    path: '/',
    redirect: '/auth'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
