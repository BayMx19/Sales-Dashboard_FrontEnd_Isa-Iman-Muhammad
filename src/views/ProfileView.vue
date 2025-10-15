<template>
  <div class="wrapper">
    <MenuView />
    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box">
                <h4 class="page-title text-black">User Profile</h4>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-4 col-lg-5">
              <div class="card text-center">
                <div class="card-body">
                  <img
                    src="/assets/images/users/avatar-1.jpg"
                    class="rounded-circle avatar-lg img-thumbnail"
                    alt="profile-image"
                  />
                  <h4 class="mb-1 mt-2">{{ user.name }}</h4>
                  <p class="text-muted">{{ user.role }}</p>

                  <div class="text-start mt-3">
                    <p class="text-muted mb-2">
                      <strong>Nama :</strong> <span class="ms-2">{{ user.name }}</span>
                    </p>
                    <p class="text-muted mb-2">
                      <strong>Email :</strong> <span class="ms-2">{{ user.email }}</span>
                    </p>
                    <p class="text-muted mb-1">
                      <strong>Status :</strong> <span class="ms-2">{{ user.status }}</span>
                    </p>
                  </div>
                  <ul class="social-list list-inline mt-3 mb-0">
                    <li class="list-inline-item">
                      <a
                        href="mailto:isaimanmuhammad19@gmail.com"
                        class="social-list-item border-danger text-danger"
                        ><i class="ri-mail-fill"></i
                      ></a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://www.linkedin.com/in/isaiman"
                        class="social-list-item border-info text-info"
                        ><i class="ri-linkedin-fill"></i
                      ></a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://github.com/BayMx19"
                        class="social-list-item border-secondary text-secondary"
                        ><i class="ri-github-fill"></i
                      ></a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="https://www.instagram.com/_isaim"
                        class="social-list-item border-secondary text-secondary"
                        ><i class="ri-instagram-fill"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-7">
              <div class="card">
                <div class="card-body">
                  <ul class="nav nav-pills bg-nav-pills nav-justified mb-3">
                    <li class="nav-item">
                      <a
                        href="#settings"
                        data-bs-toggle="tab"
                        aria-expanded="false"
                        class="nav-link rounded-end rounded-0 active"
                      >
                        Pengaturan
                      </a>
                    </li>
                  </ul>

                  <div class="tab-content">
                    <div class="tab-pane show active" id="settings">
                      <form @submit.prevent="updateProfile">
                        <h5 class="mb-4 text-uppercase bg-light p-2">
                          <i class="ri-contacts-book-2-line me-1"></i> Informasi Akun
                        </h5>

                        <div class="row">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label for="fullname" class="form-label">Nama</label>
                              <input
                                v-model="user.name"
                                type="text"
                                class="form-control"
                                id="fullname"
                                placeholder="Masukkan Nama Anda"
                                required
                              />
                            </div>
                          </div>

                          <div class="col-md-6">
                            <div class="mb-3">
                              <label for="useremail" class="form-label">Email</label>
                              <input
                                v-model="user.email"
                                type="email"
                                class="form-control"
                                id="useremail"
                                placeholder="Masukkan Email Anda"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Role & Status -->
                        <div class="row">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label class="form-label">Role</label>
                              <input type="text" class="form-control" :value="user.role" disabled />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label class="form-label">Status</label>
                              <select v-model="user.status" class="form-select">
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="changePassword"
                            id="changePasswordCheck"
                          />
                          <label class="form-check-label" for="changePasswordCheck">
                            Ubah Password?
                          </label>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label for="userpassword" class="form-label">Password Baru</label>
                              <input
                                v-model="password"
                                type="password"
                                class="form-control"
                                id="userpassword"
                                placeholder="Masukkan Password Baru"
                                :disabled="!changePassword"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label for="password_confirmation" class="form-label"
                                >Konfirmasi Password</label
                              >
                              <input
                                v-model="passwordConfirmation"
                                type="password"
                                class="form-control"
                                id="password_confirmation"
                                placeholder="Masukkan Konfirmasi Password"
                                :disabled="!changePassword"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="text-end">
                          <button type="submit" class="btn btn-success mt-2">
                            <i class="ri-save-line"></i> Simpan
                          </button>
                        </div>

                        <div v-if="message" class="alert alert-success mt-2">{{ message }}</div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FooterView />
        </div>
      </div>
    </div>
  </div>
  <RightSidebarView />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/assets/js/api/api.js'
import MenuView from '@/components/layouts/MenuView.vue'
import FooterView from '@/components/layouts/FooterView.vue'
import RightSidebarView from '@/components/layouts/RightSidebarView.vue'

const user = ref({
  id: null,
  name: '',
  email: '',
  role: '',
  status: 'ACTIVE',
})
const changePassword = ref(false)
const password = ref('')
const passwordConfirmation = ref('')
const message = ref('')

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await api.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    user.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const updateProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const payload = {
      name: user.value.name,
      email: user.value.email,
      status: user.value.status,
    }
    if (changePassword.value && password.value) {
      payload.password = password.value
      payload.password_confirmation = passwordConfirmation.value
    }

    const res = await api.put('/profile', payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    message.value = res.data.message
    password.value = ''
    passwordConfirmation.value = ''
    changePassword.value = false
  } catch (err) {
    console.error(err.response?.data || err)
  }
}

onMounted(fetchProfile)
</script>
