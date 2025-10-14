<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="importCSV">
          <div class="modal-header">
            <h5 class="modal-title color-black">Import Transaksi (CSV)</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>

          <div class="modal-body">
            <!-- Drag and Drop Area -->
            <div
              class="border border-2 border-dashed rounded-3 p-4 text-center"
              :class="{ 'border-primary bg-light': isDragging }"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
            >
              <p class="mb-2">
                <i class="bi bi-file-earmark-arrow-up fs-1 text-primary"></i>
              </p>
              <p class="mb-1">Tarik file CSV ke sini</p>
              <p class="text-muted small">atau</p>
              <input
                ref="fileInput"
                type="file"
                accept=".csv"
                class="d-none"
                @change="onFileChange"
              />
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="triggerFileInput"
              >
                Pilih File
              </button>

              <div
                v-if="file"
                class="mt-3 alert alert-success py-2 px-3 d-flex align-items-center justify-content-between"
              >
                <span>{{ file.name }}</span>
                <button class="btn btn-sm btn-link text-danger p-0" @click="removeFile">
                  <i class="bi bi-x-circle"></i>
                </button>
              </div>
            </div>

            <!-- Info Format -->
            <div class="mt-3 small text-muted">
              <p class="mb-1 fw-semibold">Format CSV yang didukung:</p>
              <code
                >product_id, qty_terjual, total_penjualan, lokasi, channel, customer,
                tanggal_transaksi</code
              >
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="!file || loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Import
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/assets/js/api/api.js'

const emit = defineEmits(['close', 'refresh'])

const file = ref(null)
const isDragging = ref(false)
const loading = ref(false)
const fileInput = ref(null)

const onDragOver = () => (isDragging.value = true)
const onDragLeave = () => (isDragging.value = false)

const onDrop = (e) => {
  isDragging.value = false
  const dropped = e.dataTransfer.files[0]
  if (dropped && dropped.name.endsWith('.csv')) {
    file.value = dropped
  } else {
    alert('Harap unggah file CSV yang valid.')
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (e) => {
  const selected = e.target.files[0]
  if (selected && selected.name.endsWith('.csv')) {
    file.value = selected
  } else {
    alert('File harus berupa CSV.')
  }
}

const removeFile = () => {
  file.value = null
  fileInput.value.value = null
}

const importCSV = async () => {
  if (!file.value) return alert('Pilih file CSV terlebih dahulu.')

  const formData = new FormData()
  formData.append('file', file.value)

  loading.value = true
  try {
    await api.post('/transactions/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    alert('Import berhasil!')
    emit('refresh')
    emit('close')
  } catch (err) {
    console.error(err)
    alert('Gagal mengimpor file CSV.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.border-dashed {
  border-style: dashed !important;
}
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
