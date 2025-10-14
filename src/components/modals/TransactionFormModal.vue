<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="saveTransaction">
          <div class="modal-header">
            <h5 class="modal-title color-black">
              {{ editData ? 'Edit Transaksi' : 'Tambah Transaksi' }}
            </h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="color-black d-flex justify-content-between align-items-center">
                <span>Produk</span>
              </label>
              <div class="row">
                <div class="col-9">
                  <select v-model="form.product_id" class="form-select" required>
                    <option value="" disabled>Pilih Produk</option>
                    <option v-for="p in products" :key="p.id" :value="p.id">
                      {{ p.nama }}
                    </option>
                  </select>
                </div>
                <div class="col-3">
                  <button type="button" class="btn btn-sm btn-success" @click="openAddProduct">
                    + Tambah
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="color-black">Qty Terjual</label>
              <input
                v-model.number="form.qty_terjual"
                type="number"
                class="form-control"
                min="1"
                required
              />
            </div>
            <div class="mb-3">
              <label class="color-black d-flex justify-content-between align-items-center">
                <span>Total Penjualan (Rp)</span>
                <small class="text-muted">(otomatis dari harga × qty, bisa diubah)</small>
              </label>
              <input
                v-model.number="form.total_penjualan"
                @input="onTotalInput"
                type="number"
                class="form-control"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div class="mb-3">
              <label class="color-black">Lokasi</label>
              <input v-model="form.lokasi" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="color-black">Channel</label>
              <select v-model="form.channel" class="form-select" required>
                <option value="" disabled>-- Pilih Channel --</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="color-black">Customer</label>
              <input v-model="form.customer" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="color-black">Tanggal Transaksi</label>
              <input v-model="form.tanggal_transaksi" type="date" class="form-control" required />
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
  <div v-if="showAddProduct" class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="saveProduct">
          <div class="modal-header">
            <h5 class="modal-title color-black">Tambah Produk</h5>
            <button type="button" class="btn-close" @click="closeAddProduct"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="color-black">Nama Produk</label>
              <input v-model="newProduct.nama" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="color-black">Endorser</label>
              <input v-model="newProduct.endorser" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="color-black">Harga</label>
              <input
                v-model.number="newProduct.harga"
                type="number"
                class="form-control"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAddProduct">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan Produk</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref, onMounted, watchEffect } from 'vue'
import api from '@/assets/js/api/api.js'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'refresh'])

const products = ref([])
const showAddProduct = ref(false)
const manualOverride = ref(false)

const form = reactive({
  product_id: '',
  qty_terjual: 1,
  total_penjualan: '',
  lokasi: '',
  channel: '',
  customer: '',
  tanggal_transaksi: '',
})

const newProduct = reactive({
  nama: '',
  endorser: '',
  harga: null,
})

onMounted(async () => {
  await loadProducts()
})

const loadProducts = async () => {
  try {
    const res = await api.get('/products')
    products.value = res.data.map((p) => ({
      ...p,
      harga: p.harga === null || p.harga === '' ? null : parseFloat(p.harga),
    }))
  } catch (err) {
    console.error('Gagal memuat produk:', err)
  }
}

const onTotalInput = () => {
  manualOverride.value = true
}

watchEffect(() => {
  if (manualOverride.value) return

  const selected = products.value.find((p) => p.id === form.product_id)
  const qty = Number(form.qty_terjual) || 0

  if (selected && selected.harga != null && qty > 0) {
    const raw = parseFloat(selected.harga) * qty
    form.total_penjualan = Math.round((raw + Number.EPSILON) * 100) / 100
  } else {
    if (!form.product_id || qty === 0) {
      form.total_penjualan = ''
    }
  }
})

watch(
  () => props.editData,
  (val) => {
    if (val) {
      Object.assign(form, {
        product_id: val.product_id ?? '',
        qty_terjual: val.qty_terjual ?? 1,
        total_penjualan: val.total_penjualan !== undefined ? Number(val.total_penjualan) : '',
        lokasi: val.lokasi ?? '',
        channel: val.channel ?? '',
        customer: val.customer ?? '',
        tanggal_transaksi: val.tanggal_transaksi ?? '',
      })
      manualOverride.value = true
    } else {
      form.product_id = ''
      form.qty_terjual = 1
      form.total_penjualan = ''
      form.lokasi = ''
      form.channel = ''
      form.customer = ''
      form.tanggal_transaksi = ''
      manualOverride.value = false
    }
  },
  { immediate: true },
)

const saveTransaction = async () => {
  try {
    const payload = {
      product_id: Number(form.product_id),
      qty_terjual: Number(form.qty_terjual),
      total_penjualan:
        form.total_penjualan === '' || form.total_penjualan === null
          ? 0
          : Number((Number(form.total_penjualan) || 0).toFixed(2)),
      lokasi: form.lokasi,
      channel: form.channel,
      customer: form.customer,
      tanggal_transaksi: form.tanggal_transaksi,
    }
    if (props.editData) {
      await api.put(`/transactions/${props.editData.id}`, payload)
    } else {
      await api.post('/transactions', payload)
    }
    emit('refresh')
    emit('close')
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan transaksi')
  }
}

const openAddProduct = () => {
  showAddProduct.value = true
}

const closeAddProduct = () => {
  showAddProduct.value = false
  newProduct.nama = ''
  newProduct.endorser = ''
  newProduct.harga = null
}

const saveProduct = async () => {
  try {
    const prodPayload = {
      nama: newProduct.nama,
      endorser: newProduct.endorser || null,
      harga:
        newProduct.harga === '' || newProduct.harga === null
          ? null
          : Number(Number(newProduct.harga).toFixed(2)),
    }

    const res = await api.post('/products', prodPayload)
    await loadProducts()
    form.product_id = res.data.data.id
    manualOverride.value = false
    showAddProduct.value = false
    newProduct.nama = ''
    newProduct.endorser = ''
    newProduct.harga = null
  } catch (err) {
    console.error(err)
    alert('Gagal menambah produk')
  }
}

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0)
</script>
<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
