<template>
  <div class="wrapper">
    <MenuView />
    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div
                class="page-title-box d-flex justify-content-between align-items-center flex-wrap gap-2"
              >
                <div>
                  <h4 class="page-title color-black mb-0">Data Transaksi</h4>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-success" @click="openImportModal">
                    <i class="mdi mdi-upload"></i> Import Excel
                  </button>

                  <button class="btn btn-primary" @click="openAddModal">
                    <i class="mdi mdi-plus"></i> Tambah Transaksi
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="alertMessage" class="alert mt-3" :class="alertClass" role="alert">
            {{ alertMessage }}
          </div>

          <div class="row mt-3">
            <div class="col-12">
              <TransactionsTable @edit="openEditModal" @delete="deleteTransaction" />
            </div>
          </div>

          <FooterView />
        </div>
      </div>
    </div>
  </div>

  <RightSidebarView />

  <TransactionFormModal
    v-if="showModal"
    :editData="selectedTransaction"
    @close="closeModal"
    @refresh="handleRefresh"
  />

  <!-- Modal import excel -->
  <TransactionImportModal
    v-if="showImportModal"
    @close="closeImportModal"
    @refresh="handleRefresh"
  />
</template>

<script setup>
import { ref } from 'vue'
import api from '@/assets/js/api/api.js'
import MenuView from '@/components/layouts/MenuView.vue'
import FooterView from '@/components/layouts/FooterView.vue'
import RightSidebarView from '@/components/layouts/RightSidebarView.vue'
import TransactionsTable from '@/components/tables/TransactionsTable.vue'
import TransactionFormModal from '@/components/modals/TransactionFormModal.vue'
import TransactionImportModal from '@/components/modals/TransactionImportModal.vue'

const showModal = ref(false)
const showImportModal = ref(false)
const selectedTransaction = ref(null)
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
  selectedTransaction.value = null
  showModal.value = true
}

const openEditModal = (transaction) => {
  selectedTransaction.value = transaction
  showModal.value = true
}

const closeModal = () => (showModal.value = false)

const openImportModal = () => (showImportModal.value = true)
const closeImportModal = () => (showImportModal.value = false)

const refreshTable = () => {
  window.dispatchEvent(new Event('refreshTransactionsTable'))
}

const handleRefresh = () => {
  refreshTable()
  showAlert(
    selectedTransaction.value
      ? 'Transaksi berhasil diperbarui!'
      : 'Transaksi berhasil ditambahkan!',
  )
  closeModal()
}

const deleteTransaction = async (id) => {
  if (confirm('Yakin ingin menghapus transaksi ini?')) {
    try {
      await api.delete(`/transactions/${id}`)
      refreshTable()
      showAlert('Transaksi berhasil dihapus!')
    } catch (error) {
      console.error(error)
      showAlert('Gagal menghapus transaksi', 'error')
    }
  }
}
</script>
