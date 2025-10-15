<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Sessions Overview</h5>
      <div ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ApexCharts from 'apexcharts'

const props = defineProps({ data: { type: Array, required: true } })

const chartRef = ref(null)
let chart = null

const renderChart = () => {
  if (!chartRef.value) return
  if (chart) chart.destroy()

  const options = {
    chart: { type: 'line', height: 350 },
    series: [{ name: 'Sessions', data: props.data.map((d) => Number(d.sessions)) }],
    xaxis: { categories: props.data.map((d) => d.tanggal_transaksi) },
    stroke: { width: 3 },
    yaxis: { title: { text: 'Sessions' } },
  }

  chart = new ApexCharts(chartRef.value, options)
  chart.render()
}

watch(
  () => props.data,
  (newData) => {
    if (newData.length > 0) renderChart()
  },
  { deep: true, immediate: true },
)
</script>
