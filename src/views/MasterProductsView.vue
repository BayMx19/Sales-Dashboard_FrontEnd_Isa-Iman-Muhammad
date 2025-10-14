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
                  <h4 class="page-title color-black mb-0">Master Products</h4>
                </div>
                <button class="btn btn-primary" @click="openAddModal">
                  <i class="mdi mdi-plus"></i> Tambah Produk
                </button>
              </div>
            </div>
          </div>

          <div v-if="alertMessage" class="alert mt-3" :class="alertClass" role="alert">
            {{ alertMessage }}
          </div>

          <div class="row mt-3">
            <div class="col-12">
              <ProductsTable @edit="openEditModal" @delete="deleteProduct" />
            </div>
          </div>

          <FooterView />
        </div>
      </div>
    </div>
  </div>

  <RightSidebarView />

  <ProductFormModal
    v-if="showModal"
    :editData="selectedProduct"
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
import ProductsTable from '@/components/tables/ProductsTable.vue'
import ProductFormModal from '@/components/modals/ProductsFormModal.vue'

const showModal = ref(false)
const selectedProduct = ref(null)
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
  selectedProduct.value = null
  showModal.value = true
}

const openEditModal = (product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => (showModal.value = false)

const refreshTable = () => {
  window.dispatchEvent(new Event('refreshProductsTable'))
}

const handleRefresh = () => {
  refreshTable()
  showAlert(selectedProduct.value ? 'Produk berhasil diperbarui!' : 'Produk berhasil ditambahkan!')
  closeModal()
}

const deleteProduct = async (id) => {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    try {
      await api.delete(`/products/${id}`)
      refreshTable()
      showAlert('Produk berhasil dihapus!')
    } catch (error) {
      console.error(error)
      showAlert('Gagal menghapus produk', 'error')
    }
  }
}
</script>
