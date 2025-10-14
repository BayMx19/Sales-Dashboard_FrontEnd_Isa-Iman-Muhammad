<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="saveProduct">
          <div class="modal-header">
            <h5 class="modal-title color-black">
              {{ editData ? 'Edit Produk' : 'Tambah Produk' }}
            </h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="color-black">Nama Produk</label>
              <input v-model="form.nama" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="color-black">Endorser</label>
              <input v-model="form.endorser" type="text" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="color-black">Harga</label>
              <input v-model="form.harga" type="number" class="form-control" min="0" />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import api from '@/assets/js/api/api.js'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'refresh'])

const form = reactive({
  nama: '',
  endorser: '',
  harga: '',
})

watch(
  () => props.editData,
  (val) => {
    if (val) Object.assign(form, val)
    else {
      form.nama = ''
      form.endorser = ''
      form.harga = ''
    }
  },
  { immediate: true },
)

const saveProduct = async () => {
  try {
    if (props.editData) {
      await api.put(`/products/${props.editData.id}`, form)
    } else {
      await api.post('/products', form)
    }
    emit('refresh')
    emit('close')
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan produk')
  }
}
</script>
