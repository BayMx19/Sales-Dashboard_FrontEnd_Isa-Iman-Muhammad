<template>
  <div class="card">
    <div class="card-body">
      <table id="products-table" class="table table-striped dt-responsive nowrap w-100"></table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, defineEmits } from 'vue'
import api from '@/assets/js/api/api.js'

const emit = defineEmits(['edit', 'delete'])

onMounted(() => {
  initProductsTable(emit)
  window.addEventListener('refreshProductsTable', reloadTable)
})

onBeforeUnmount(() => {
  window.removeEventListener('refreshProductsTable', reloadTable)
})

const reloadTable = () => {
  $('#products-table').DataTable().ajax.reload(null, false)
}

window.initProductsTable = function (emit) {
  $('#products-table').DataTable({
    ajax: {
      url: api.defaults.baseURL + '/products',
      type: 'GET',
      beforeSend: function (xhr) {
        const token = localStorage.getItem('token')
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      },
      dataSrc: function (json) {
        // console.log('Response:', json)
        return json
      },
      error: function (xhr, error, thrown) {
        console.error('Ajax Error:', error, xhr.status, xhr.responseText)
      },
    },
    columns: [
      { data: 'nama', title: 'Nama Produk' },
      { data: 'endorser', title: 'Endorser' },
      {
        data: 'harga',
        title: 'Harga',
        render: (data) => {
          if (data == null) return '-'
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(data)
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
    drawCallback: function () {
      $('#products-table .edit-btn')
        .off('click')
        .on('click', function () {
          const data = $('#products-table').DataTable().row($(this).parents('tr')).data()
          emit('edit', data)
        })

      $('#products-table .delete-btn')
        .off('click')
        .on('click', function () {
          const id = $(this).data('id')
          emit('delete', id)
        })
    },
  })
}
</script>
