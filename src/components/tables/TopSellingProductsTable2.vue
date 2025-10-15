<template>
  <div class="card mt-3">
    <div class="card-body">
      <h5 class="card-title">Top Selling Products</h5>
      <div class="table-responsive">
        <table class="table table-striped table-bordered mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Qty Sold</th>
              <th>Talent/Endorser</th>
              <th>Channel</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, index) in products" :key="p.product_name">
              <td>{{ index + 1 }}</td>
              <td>{{ p.product_name }}</td>
              <td>{{ p.qty_sold }}</td>
              <td>{{ p.talent || '-' }}</td>
              <td>{{ p.channel }}</td>
              <td>{{ p.harga ? p.harga.toLocaleString() : '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: { type: Array, required: true },
})
</script>
