<template>
  <div
    class="min-vh-100 vw-100 d-flex align-items-center justify-content-center position-relative bg-light"
  >
    <div
      class="position-absolute top-0 start-0 w-100 h-100"
      style="
        background-image: radial-gradient(circle at 1px 1px, #d4d4d4 1px, transparent 0);
        background-size: 20px 20px;
      "
    ></div>

    <div class="card shadow-lg border-0 rounded-2 position-relative login-card">
      <div
        class="card-header bg-primary text-white text-center py-3 rounded-top-2 fw-semibold fs-5 fs-md-4"
        style="letter-spacing: 1px"
      >
        Sales Dashboard APP
      </div>

      <div class="card-body p-4 p-sm-5">
        <h5 class="text-center mb-1 fw-semibold">Register</h5>
        <p class="text-center text-muted small mb-4">Buat akun baru untuk mengakses panel.</p>

        <!-- ALERT FEEDBACK -->
        <transition name="fade">
          <div v-if="alert.message" :class="['alert', alert.type]" role="alert">
            {{ alert.message }}
          </div>
        </transition>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="name" class="form-label">Nama Lengkap</label>
            <input
              v-model="name"
              type="text"
              id="name"
              class="form-control"
              placeholder="Masukkan Nama Lengkap"
              required
              autocomplete="name"
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Masukkan Email Anda"
              required
              autocomplete="email"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="••••••••"
              required
              autocomplete="new-password"
            />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="form-control"
              placeholder="••••••••"
              required
              autocomplete="new-password"
            />
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-semibold py-2" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Daftar' }}
          </button>
        </form>

        <div class="text-center mt-2 small text-muted">
          Sudah punya akun?
          <a href="/login" class="text-primary fw-semibold text-decoration-none">Masuk</a>
        </div>

        <p class="text-center text-secondary small mt-4 mb-0">
          © 2025 - Sales Dashboard | Isa Iman Muhammad
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/assets/js/api/auth/register.js'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const alert = ref({ message: '', type: '' })

const router = useRouter()

const handleRegister = async () => {
  alert.value = { message: '', type: '' } // reset alert
  if (password.value !== confirmPassword.value) {
    alert.value = { message: 'Password dan konfirmasi tidak cocok.', type: 'alert-danger' }
    return
  }

  loading.value = true
  const result = await registerUser(name.value, email.value, password.value)
  loading.value = false

  if (result.success) {
    alert.value = {
      message: 'Registrasi berhasil! Mengarahkan ke halaman login...',
      type: 'alert-success',
    }
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } else {
    alert.value = { message: result.message || 'Registrasi gagal.', type: 'alert-danger' }
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  background-color: white;
}

.alert {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 576px) {
  .login-card {
    margin: 0 1rem;
    border-radius: 12px;
  }

  .card-header {
    font-size: 1rem !important;
    padding: 0.75rem !important;
  }

  .card-body {
    padding: 1.25rem !important;
  }

  .btn {
    font-size: 0.9rem;
    padding: 0.6rem;
  }

  p.small {
    font-size: 0.8rem;
  }
}
</style>
