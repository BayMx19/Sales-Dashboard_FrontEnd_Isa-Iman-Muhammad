import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/LoginView.vue'
import Register from '../views/auth/RegisterView.vue'
import Dashboard from '../views/DashboardView.vue'

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
