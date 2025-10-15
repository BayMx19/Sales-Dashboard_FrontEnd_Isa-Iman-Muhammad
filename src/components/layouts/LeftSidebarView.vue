<template>
  <div class="leftside-menu">
    <a href="#" class="logo logo-light">
      <span class="text-white mb-0"
        ><h3 class="mb-3 mt-3"><b>Sales Dashboard</b></h3></span
      >
    </a>

    <div
      class="button-sm-hover"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      title="Show Full Sidebar"
    >
      <i class="ri-checkbox-blank-circle-line align-middle"></i>
    </div>

    <div class="button-close-fullsidebar">
      <i class="ri-close-fill align-middle"></i>
    </div>

    <div class="h-100" id="leftside-menu-container" data-simplebar>
      <div class="leftbar-user">
        <a href="pages-profile.php">
          <img
            src="/assets/images/users/avatar-1.jpg"
            alt="user-image"
            height="42"
            class="rounded-circle shadow-sm"
          />
          <span class="leftbar-user-name mt-2">Tosha Minner</span>
        </a>
      </div>

      <ul class="side-nav">
        <li class="side-nav-title">Home</li>

        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarDashboards"
            aria-expanded="false"
            aria-controls="sidebarDashboards"
            class="side-nav-link"
          >
            <i class="ri-home-4-line"></i>

            <span> Dashboards </span>
          </a>
          <div class="collapse" id="sidebarDashboards">
            <ul class="side-nav-second-level">
              <li>
                <a href="/dashboard">Dashboard Utama</a>
              </li>
              <li>
                <a href="/dashboard-products">Dashboard Product</a>
              </li>
            </ul>
          </div>
        </li>

        <li class="side-nav-title">Master</li>

        <li class="side-nav-item" v-if="isAdmin">
          <a href="/master-users" class="side-nav-link">
            <i class="ri-group-line"></i>
            <span> Users </span>
          </a>
        </li>

        <li class="side-nav-item">
          <a href="/master-products" class="side-nav-link">
            <i class="ri-shopping-bag-2-line"></i>
            <span> Products </span>
          </a>
        </li>
        <li class="side-nav-title">Transaksi</li>

        <li class="side-nav-item">
          <a href="/data-transaksi" class="side-nav-link">
            <i class="ri-file-list-3-line"></i>
            <span> Data Transaksi </span>
          </a>
        </li>

        <li class="side-nav-item">
          <a href="/polling" class="side-nav-link">
            <i class="ri-bar-chart-line"></i>
            <span> Polling </span>
          </a>
        </li>
        <li class="side-nav-title">Pengaturan</li>

        <li class="side-nav-item">
          <a href="/profile" class="side-nav-link">
            <i class="ri-user-line"></i>
            <span> Profile </span>
          </a>
        </li>

        <li class="side-nav-item">
          <a href="#" class="side-nav-link" @click.prevent="handleLogout">
            <i class="ri-logout-circle-line"></i>
            <span> Logout </span>
          </a>
        </li>
      </ul>

      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import api from '@/assets/js/api/api.js'

const router = useRouter()
const userRole = localStorage.getItem('role')
const isAdmin = userRole === 'Admin'
const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      await api.post('/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }
    localStorage.removeItem('token')
    router.push('/login')
  } catch (err) {
    console.error('Logout gagal:', err)
  }
}
</script>
