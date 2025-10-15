<template>
  <div class="wrapper">
    <MenuView />

    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box">
                <h4 class="page-title text-black">Dashboard Product</h4>
              </div>
            </div>
          </div>

          <!-- Top Selling Products -->
          <TopSellingProductsTable :products="topProducts" />

          <div class="row">
            <!-- Channel Overview (Radar) -->
            <div class="col-lg-6">
              <ChannelOverviewRadar :data="channelData" />
            </div>

            <!-- Sessions Overview (Line) -->
            <div class="col-lg-6">
              <SessionsOverviewLine :data="sessionsData" />
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

import TopSellingProductsTable from '@/components/tables/TopSellingProductsTable2.vue'
import ChannelOverviewRadar from '@/components/charts/ChannelOverviewRadar.vue'
import SessionsOverviewLine from '@/components/charts/SessionsOverviewLine.vue'

const topProducts = ref([])
const channelData = ref([])
const sessionsData = ref([])

const fetchDashboardProduct = async () => {
  try {
    const token = localStorage.getItem('token')

    const resTop = await api.get('/dashboard-product/top-products', {
      headers: { Authorization: `Bearer ${token}` },
    })
    topProducts.value = resTop.data.data

    const resChannel = await api.get('/dashboard-product/channel-overview', {
      headers: { Authorization: `Bearer ${token}` },
    })
    channelData.value = resChannel.data.data

    const resSessions = await api.get('/dashboard-product/sessions-overview', {
      headers: { Authorization: `Bearer ${token}` },
    })
    sessionsData.value = resSessions.data.data
  } catch (err) {
    console.error(err)
  }
}
onMounted(fetchDashboardProduct)
</script>
