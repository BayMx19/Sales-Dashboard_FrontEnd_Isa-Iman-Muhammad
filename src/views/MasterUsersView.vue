<template>
  <div class="wrapper">
    <MenuView />
    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="page-title color-black mb-0">Master Users</h4>
                </div>
                <button class="btn btn-primary" @click="openAddModal">
                  <i class="mdi mdi-plus"></i> Tambah User
                </button>
              </div>
            </div>
          </div>
          <div v-if="alertMessage" class="alert mt-3" :class="alertClass" role="alert">
            {{ alertMessage }}
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <UsersTable @edit="openEditModal" @delete="deleteUser" />
            </div>
          </div>

          <FooterView />
        </div>
      </div>
    </div>
  </div>
  <RightSidebarView />
  <UserFormModal
    v-if="showModal"
    :editData="selectedUser"
    @close="closeModal"
    @refresh="handleRefresh"
  />
</template>

<script setup>
import { ref } from 'vue'
import api from '@/assets/js/api/api.js'
import MenuView from '@/components/layouts/MenuView.vue'
import FooterView from '@/components/layouts/FooterView.vue'
import RightSidebarView from '@/components/layouts/RightSidebarView.vue'
import UsersTable from '@/components/tables/UsersTable.vue'
import UserFormModal from '@/components/modals/UserFormModal.vue'

const showModal = ref(false)
const selectedUser = ref(null)
const alertMessage = ref('')
const alertClass = ref('alert-success')

const showAlert = (message, type = 'success') => {
  alertMessage.value = message
  alertClass.value = type === 'error' ? 'alert-danger' : 'alert-success'

  setTimeout(() => {
    alertMessage.value = ''
  }, 3000)
}

const openAddModal = () => {
  selectedUser.value = null
  showModal.value = true
}

const openEditModal = (user) => {
  selectedUser.value = user
  showModal.value = true
}

const closeModal = () => (showModal.value = false)

const refreshTable = () => {
  window.dispatchEvent(new Event('refreshUsersTable'))
}

const handleRefresh = () => {
  refreshTable()
  showAlert(selectedUser.value ? 'User berhasil diperbarui!' : 'User berhasil ditambahkan!')
  closeModal()
}
const deleteUser = async (id) => {
  if (confirm('Yakin ingin menghapus user ini?')) {
    try {
      await api.delete(`/users/${id}`)
      refreshTable()
      showAlert('User berhasil dihapus!')
    } catch (error) {
      console.error(error)
      showAlert('Gagal menghapus user', 'error')
    }
  }
}
</script>
