<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title text-black">Total Sales by Channel</h5>
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
    chart: { type: 'donut', height: 350 },
    series: props.data.map((d) => Number(d.total_revenue)),
    labels: props.data.map((d) => d.channel),
    legend: { position: 'bottom' },
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
