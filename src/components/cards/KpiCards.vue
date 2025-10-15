<template>
  <div class="row mb-3">
    <div class="col-md-6 col-xl-6">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="text-black">Product Sales</h5>
          <h3>{{ kpi.productSales }}</h3>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-xl-6">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="">Unique Customer</h5>
          <h3>{{ kpi.uniqueCustomer }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  kpi: { type: Object, required: true },
})
</script>
