import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/LoginView.vue'
import Register from '../views/auth/RegisterView.vue'
import Dashboard from '../views/DashboardView.vue'
import DashboardProduct from '../views/DashboardProductView.vue'
import DataTransaksi from '../views/DataTransaksiView.vue'
import MasterProducts from '../views/MasterProductsView.vue'
import MasterUsers from '../views/MasterUsersView.vue'
import Polling from '../views/PollingView.vue'
import Profile from '../views/ProfileView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard-products',
    name: 'dashboard-products',
    component: DashboardProduct,
    meta: { requiresAuth: true },
  },
  {
    path: '/data-transaksi',
    name: 'data-transaksi',
    component: DataTransaksi,
    meta: { requiresAuth: true },
  },
  {
    path: '/master-products',
    name: 'master-products',
    component: MasterProducts,
    meta: { requiresAuth: true },
  },
  {
    path: '/master-users',
    name: 'master-users',
    component: MasterUsers,
    meta: { requiresAuth: true },
  },
  {
    path: '/polling',
    name: 'polling',
    component: Polling,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
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
