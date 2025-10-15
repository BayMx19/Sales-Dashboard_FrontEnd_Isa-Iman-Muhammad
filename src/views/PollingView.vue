<template>
  <div class="wrapper">
    <MenuView />

    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <!-- Card KPI -->
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="page-title color-black mb-0">Polling Realtime</h4>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5>Total Produk Terjual</h5>
                  <h3>{{ totalQty }}</h3>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5>Total Revenue</h5>
                  <h3>{{ currency(totalRevenue) }}</h3>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5>Jumlah Produk Top 10</h5>
                  <h3>{{ uniqueProductsCount }}</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Table Top Selling Products -->
          <div class="row mt-1">
            <div class="col-12">
              <PollingTable table-id="top-selling-table" :url="'/top-selling'" :columns="columns" />
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
import PollingTable from '@/components/tables/PollingTable.vue'

const topProducts = ref([])
const totalQty = ref(0)
const totalRevenue = ref(0)
const uniqueProductsCount = ref(0)

const columns = [
  {
    data: 'product.nama',
    title: 'Nama Produk',
    render: (data, type, row) => row.product?.nama ?? '-',
  },
  { data: 'total_qty', title: 'Qty Terjual' },
  {
    data: 'total_revenue',
    title: 'Total Revenue',
    render: (data) =>
      new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(data),
  },
]

const currency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)

const fetchTopProducts = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await api.get('/top-selling', { headers: { Authorization: `Bearer ${token}` } })
    topProducts.value = res.data

    totalQty.value = topProducts.value.reduce((sum, p) => sum + Number(p.total_qty), 0)
    totalRevenue.value = topProducts.value.reduce((sum, p) => sum + Number(p.total_revenue), 0)
    uniqueProductsCount.value = new Set(topProducts.value.map((p) => p.product_id)).size
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchTopProducts()
  setInterval(fetchTopProducts, 10000) // polling tiap 10 detik untuk KPI cards
})
</script>
