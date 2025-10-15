<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title text-black">Revenue vs Sales</h5>
      <div ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import ApexCharts from 'apexcharts'

const props = defineProps({
  data: { type: Array, required: true },
})

const chartRef = ref(null)
let chart = null

const renderChart = () => {
  if (!chartRef.value || !props.data || props.data.length === 0) return

  // destroy chart lama jika ada
  if (chart) {
    chart.destroy()
    chart = null
  }

  const options = {
    chart: { type: 'line', height: 350 },
    series: [
      {
        name: 'Revenue',
        type: 'column',
        data: props.data.map((d) => Number(d.total_revenue)),
      },
      {
        name: 'Qty Sold',
        type: 'line',
        data: props.data.map((d) => Number(d.total_qty)),
      },
    ],
    xaxis: { categories: props.data.map((d) => d.tanggal_transaksi) },
    stroke: { width: [0, 4] },
    yaxis: [{ title: { text: 'Revenue' } }, { opposite: true, title: { text: 'Qty Sold' } }],
    legend: { show: true },
  }

  chart = new ApexCharts(chartRef.value, options)
  chart.render()
}

// watch props.data, rerender otomatis saat data update
watch(
  () => props.data,
  (newData) => {
    if (newData && newData.length > 0) renderChart()
  },
  { deep: true, immediate: true },
)
</script>
