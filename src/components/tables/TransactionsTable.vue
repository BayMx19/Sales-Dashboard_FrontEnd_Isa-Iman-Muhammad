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

const userRole = localStorage.getItem('role')
const isAdmin = userRole === 'Admin'

onMounted(() => {
  initTransactionsTable(emit, isAdmin)
  window.addEventListener('refreshTransactionsTable', reloadTable)
})

onBeforeUnmount(() => {
  window.removeEventListener('refreshTransactionsTable', reloadTable)
})

const reloadTable = () => {
  $('#transactions-table').DataTable().ajax.reload(null, false)
}

window.initTransactionsTable = function (emit, isAdmin) {
  const columns = [
    { data: 'product.nama', title: 'Nama Produk' },
    { data: 'qty_terjual', title: 'Qty' },
    {
      data: 'total_penjualan',
      title: 'Total Penjualan',
      render: (data) => {
        if (data == null) return '-'
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(data)
      },
    },
    { data: 'lokasi', title: 'Lokasi' },
    { data: 'channel', title: 'Channel' },
    { data: 'customer', title: 'Customer' },
    {
      data: 'tanggal_transaksi',
      title: 'Tanggal',
      render: (data) => {
        if (!data) return '-'
        const date = new Date(data)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      },
    },
  ]

  if (isAdmin) {
    columns.push({
      data: null,
      title: 'Aksi',
      orderable: false,
      render: (data, type, row) => `
        <button class="btn btn-sm btn-warning edit-btn" data-id="${row.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${row.id}">Delete</button>
      `,
    })
  }

  $('#transactions-table').DataTable({
    serverSide: true,
    processing: true,
    ajax: {
      url: api.defaults.baseURL + '/transactions',
      type: 'GET',
      beforeSend: function (xhr) {
        const token = localStorage.getItem('token')
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      },
      error: function (xhr, error, thrown) {
        console.error('Ajax Error:', error, xhr.status, xhr.responseText)
      },
    },
    columns,
    pageLength: 10,
    lengthMenu: [10, 25, 50, 100],
    destroy: true,
    responsive: true,
    order: [[0, 'desc']],
    drawCallback: function () {
      if (!isAdmin) return

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
