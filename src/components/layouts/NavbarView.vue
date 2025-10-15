<template>
  <div class="navbar-custom">
    <div class="topbar container-fluid">
      <div class="d-flex align-items-center gap-lg-2 gap-1">
        <div class="logo-topbar">
          <a href="#" class="logo-light">
            <span class="logo-lg">
              <img src="/assets/images/logo.png" alt="logo" />
            </span>
            <span class="logo-sm">
              <img src="/assets/images/logo-sm.png" alt="small logo" />
            </span>
          </a>

          <a href="index.php" class="logo-dark">
            <span class="logo-lg">
              <img src="/assets/images/logo-dark.png" alt="dark logo" />
            </span>
            <span class="logo-sm">
              <img src="/assets/images/logo-sm.png" alt="small logo" />
            </span>
          </a>
        </div>

        <button class="button-toggle-menu">
          <i class="ri-menu-2-fill"></i>
        </button>

        <button
          class="navbar-toggle"
          data-bs-toggle="collapse"
          data-bs-target="#topnav-menu-content"
        >
          <div class="lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <ul class="topbar-menu d-flex align-items-center gap-3">
        <li class="d-none d-sm-inline-block">
          <a class="nav-link" data-bs-toggle="offcanvas" href="#theme-settings-offcanvas">
            <i class="ri-settings-3-line fs-22"></i>
          </a>
        </li>

        <li class="d-none d-sm-inline-block">
          <div
            class="nav-link"
            id="light-dark-mode"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Theme Mode"
          >
            <i class="ri-moon-line fs-22"></i>
          </div>
        </li>

        <li class="d-none d-md-inline-block">
          <a class="nav-link" href="" data-toggle="fullscreen">
            <i class="ri-fullscreen-line fs-22"></i>
          </a>
        </li>

        <li class="dropdown">
          <a
            class="nav-link dropdown-toggle arrow-none nav-user px-2"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <span class="account-user-avatar">
              <img
                src="/assets/images/users/avatar-1.jpg"
                alt="user-image"
                width="32"
                class="rounded-circle"
              />
            </span>
            <span class="d-lg-flex flex-column gap-1 d-none">
              <h5 class="my-0">{{ user.name }}</h5>
              <h6 class="my-0 fw-normal">{{ user.role }}</h6>
            </span>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome !</h6>
            </div>

            <a href="/profile" class="dropdown-item">
              <i class="ri-user-circle-line fs-18 align-middle me-1"></i>
              <span>Profile</span>
            </a>

            <a href="#" class="dropdown-item" @click.prevent="handleLogout">
              <i class="ri-logout-circle-line fs-18 align-middle me-1"></i>
              <span>Logout</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/assets/js/api/api.js'

const router = useRouter()
const user = ref({ name: '', role: '' })

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await api.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    user.value = res.data
  } catch (err) {
    console.error('Gagal fetch user:', err)
  }
}

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

onMounted(fetchUser)
</script>
