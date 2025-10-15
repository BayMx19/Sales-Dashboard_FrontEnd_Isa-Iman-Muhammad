<template>
  <div class="wrapper">
    <MenuView />

    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <!-- Page Title -->
          <div class="row">
            <div class="col-12">
              <div class="page-title-box">
                <h4 class="page-title text-black">Dashboard</h4>
              </div>
            </div>
          </div>

          <!-- KPI Cards -->
          <KpiCards :kpi="kpi" />

          <div class="row">
            <!-- Revenue vs Sales Chart -->
            <div class="col-lg-8">
              <RevenueSalesChart :data="revenueSales" />
            </div>

            <!-- Sales Channel Donut -->
            <div class="col-lg-4">
              <SalesChannelDonut :data="salesByChannel" />
            </div>
          </div>

          <!-- Top Selling Products Table -->
          <TopSellingProductsTable :products="topProducts" />

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

import KpiCards from '@/components/cards/KpiCards.vue'
import RevenueSalesChart from '@/components/charts/RevenueSalesChart.vue'
import SalesChannelDonut from '@/components/charts/SalesChannelDonut.vue'
import TopSellingProductsTable from '@/components/tables/TopSellingProductsTable.vue'

const kpi = ref({ productSales: 0, uniqueCustomer: 0 })
const revenueSales = ref([])
const salesByChannel = ref([])
const topProducts = ref([])

const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem('token')

    // KPI
    const resKpi = await api.get('/dashboard/kpi', {
      headers: { Authorization: `Bearer ${token}` },
    })
    kpi.value = resKpi.data.data

    // Revenue vs Sales
    const resRevenue = await api.get('/dashboard/revenue-sales', {
      headers: { Authorization: `Bearer ${token}` },
    })
    revenueSales.value = resRevenue.data.data

    // Sales by Channel
    const resChannel = await api.get('/dashboard/sales-channel', {
      headers: { Authorization: `Bearer ${token}` },
    })
    salesByChannel.value = resChannel.data.data

    // Top Products
    const resTop = await api.get('/dashboard/top-products', {
      headers: { Authorization: `Bearer ${token}` },
    })
    topProducts.value = resTop.data.data
    console.log('KPI:', resKpi.data.data)
    console.log('RevenueSales:', resRevenue.data.data)
    console.log('SalesByChannel:', resChannel.data.data)
    console.log('TopProducts:', resTop.data.data)
  } catch (err) {
    console.error(err)
  }
}
onMounted(fetchDashboard)
</script>
