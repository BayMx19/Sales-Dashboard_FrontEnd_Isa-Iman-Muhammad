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
                  <h4 class="text-dark-50 text-center pb-0 fw-bold">Sign In</h4>
                  <p class="text-muted mb-4">
                    Masukkan Email dan Password anda untuk mengakses aplikasi.
                  </p>
                </div>
                <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>
                <form @submit.prevent="handleLogin">
                  <div class="mb-3">
                    <label for="emailaddress" class="form-label">Email</label>
                    <input
                      v-model="email"
                      class="form-control"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Masukkan Email Anda"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group input-group-merge">
                      <input
                        v-model="password"
                        type="password"
                        id="password"
                        class="form-control"
                        placeholder="Masukkan Password Anda"
                        required
                      />
                      <div class="input-group-text" @click="togglePassword">
                        <span :class="passwordVisible ? 'bi-eye-slash' : 'bi-eye'"></span>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="checkbox-signin"
                        checked
                      />
                      <label class="form-check-label" for="checkbox-signin">Ingat Saya</label>
                    </div>
                  </div>

                  <div class="mb-3 mb-0 text-center">
                    <button class="btn btn-primary w-100" type="submit">
                      {{ loading ? 'Logging in...' : 'Log In' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12 text-center">
                <p class="text-muted">
                  Belum punya akun?
                  <router-link
                    to="/register"
                    class="text-muted ms-1 link-offset-3 text-decoration-underline"
                  >
                    <b>Sign Up</b>
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
import { loginUser } from '@/assets/js/api/auth/login.js'
import BackgroundImg from '@/components/layouts/BackgroundView.vue'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const passwordVisible = ref(false)
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  const result = await loginUser(email.value, password.value)
  loading.value = false

  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.message
  }
}

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value
  const input = document.getElementById('password')
  input.type = passwordVisible.value ? 'text' : 'password'
}
</script>

<style scoped>
.authentication-bg {
  background-color: #f5f6f8;
}

.card {
  border-radius: 0.25rem;
}

.input-group-text {
  cursor: pointer;
}

@media (max-width: 576px) {
  .card {
    margin: 0 1rem;
  }
}
</style>
