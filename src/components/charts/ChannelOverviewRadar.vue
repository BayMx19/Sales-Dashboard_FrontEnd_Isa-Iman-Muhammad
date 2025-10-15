<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Channel Overview</h5>
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
    chart: { type: 'radar', height: 350 },
    series: [{ name: 'Qty Sold', data: props.data.map((d) => d.total_qty) }],
    labels: props.data.map((d) => d.channel),
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
