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
        <h5 class="text-center mb-1 fw-semibold">Sign In</h5>
        <p class="text-center text-muted small mb-4">
          Masukkan Email dan Password anda<br />
          untuk masuk ke panel.
        </p>

        <form @submit.prevent="handleLogin">
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
              autocomplete="current-password"
            />
          </div>

          <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="remember" />
            <label class="form-check-label small" for="remember">Ingat Saya</label>
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-semibold py-2">Masuk</button>
        </form>
        <div class="text-center mt-2 small text-muted">
          Belum punya akun?
          <a href="/register" class="text-primary fw-semibold text-decoration-none">Daftar</a>
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
import { loginUser } from '@/assets/js/api/auth/login.js'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  const result = await loginUser(email.value, password.value)
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.message
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  background-color: white;
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
