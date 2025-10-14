<template>
  <div class="card">
    <div class="card-body">
      <table id="transactions-table" class="table table-striped dt-responsive nowrap w-100"></table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, defineEmits } from 'vue'
import api from '@/assets/js/api/api.js'

const emit = defineEmits(['edit', 'delete'])

onMounted(() => {
  initTransactionsTable(emit)
  window.addEventListener('refreshTransactionsTable', reloadTable)
})

onBeforeUnmount(() => {
  window.removeEventListener('refreshTransactionsTable', reloadTable)
})

const reloadTable = () => {
  $('#transactions-table').DataTable().ajax.reload(null, false)
}

window.initTransactionsTable = function (emit) {
  $('#transactions-table').DataTable({
    ajax: {
      url: api.defaults.baseURL + '/transactions',
      type: 'GET',
      beforeSend: function (xhr) {
        const token = localStorage.getItem('token')
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      },
      dataSrc: function (json) {
        return json
      },
      error: function (xhr, error, thrown) {
        console.error('Ajax Error:', error, xhr.status, xhr.responseText)
      },
    },
    columns: [
      { data: 'product.nama', title: 'Nama Produk' },
      { data: 'qty_terjual', title: 'Qty Terjual' },
      {
        data: 'total_penjualan',
        title: 'Total Penjualan',
        render: (data) => {
          if (data == null) return '-'
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(data)
        },
      },
      { data: 'lokasi', title: 'Lokasi' },
      { data: 'channel', title: 'Channel' },
      { data: 'customer', title: 'Customer' },
      {
        data: 'tanggal_transaksi',
        title: 'Tanggal Transaksi',
        render: (data) => {
          if (!data) return '-'
          const date = new Date(data)
          return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        },
      },
      {
        data: null,
        title: 'Aksi',
        orderable: false,
        render: (data, type, row) => `
          <button class="btn btn-sm btn-warning edit-btn" data-id="${row.id}">Edit</button>
          <button class="btn btn-sm btn-danger delete-btn" data-id="${row.id}">Delete</button>
        `,
      },
    ],
    destroy: true,
    responsive: true,
    order: [[0, 'desc']],
    drawCallback: function () {
      $('#transactions-table .edit-btn')
        .off('click')
        .on('click', function () {
          const data = $('#transactions-table').DataTable().row($(this).parents('tr')).data()
          emit('edit', data)
        })

      $('#transactions-table .delete-btn')
        .off('click')
        .on('click', function () {
          const id = $(this).data('id')
          emit('delete', id)
        })
    },
  })
}
</script>
