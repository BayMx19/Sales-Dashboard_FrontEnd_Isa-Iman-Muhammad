<template>
  <div class="authentication-bg position-relative min-vh-100 vw-100">
    <BackgroundImg />

    <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-4 col-lg-5">
            <div class="card">
              <div class="card-header py-4 text-center bg-primary">
                <a href="#">
                  <span class="text-white mb-0"
                    ><h3 class="mb-0"><b>Sales Dashboard App</b></h3></span
                  >
                </a>
              </div>
              <div class="card-body p-4">
                <div class="text-center w-75 m-auto">
                  <h4 class="text-dark-50 text-center pb-0 fw-bold">Register</h4>
                  <p class="text-muted mb-4">Buat akun baru untuk mengakses aplikasi.</p>
                </div>
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
                    <div class="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        class="form-control"
                        placeholder="••••••••"
                        v-model="password"
                        required
                        autocomplete="new-password"
                      />
                      <div class="input-group-text" data-password="false">
                        <span class="password-eye"></span>
                      </div>
                    </div>
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

                  <div class="mb-3 mb-0 text-center">
                    <button class="btn btn-primary w-100" type="submit" :disabled="loading">
                      {{ loading ? 'Memproses...' : 'Daftar' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12 text-center">
                <p class="text-muted">
                  Sudah punya akun?
                  <router-link
                    to="/login"
                    class="text-muted ms-1 link-offset-3 text-decoration-underline"
                  >
                    <b>Sign In</b>
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer footer-alt fw-medium">
      <span class="bg-body">
        {{ new Date().getFullYear() }} © Sales Dashboard App | Isa Iman Muhammad
      </span>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/assets/js/api/auth/register.js'
import BackgroundImg from '@/components/layouts/BackgroundView.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const alert = ref({ message: '', type: '' })

const router = useRouter()

const handleRegister = async () => {
  alert.value = { message: '', type: '' }
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
    setTimeout(() => router.push('/login'), 1500)
  } else {
    alert.value = { message: result.message || 'Registrasi gagal.', type: 'alert-danger' }
  }
}
</script>

<style scoped>
.authentication-bg {
  background-color: #f5f6f8;
}

.card {
  border-radius: 0.25rem;
}

.alert {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.input-group-text {
  cursor: pointer;
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
  .card {
    margin: 0 1rem;
  }
}
</style>
