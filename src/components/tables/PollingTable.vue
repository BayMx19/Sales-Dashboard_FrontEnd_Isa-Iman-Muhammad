<template>
  <div class="card">
    <div class="card-body">
      <table :id="tableId" class="table table-striped dt-responsive nowrap w-100"></table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, defineEmits } from 'vue'
import api from '@/assets/js/api/api.js'

const props = defineProps({
  tableId: { type: String, default: 'polling-table' },
  columns: { type: Array, required: true },
  url: { type: String, required: true },
})
const emit = defineEmits(['edit', 'delete'])

let pollingInterval

const reloadTable = () => {
  const dt = $(`#${props.tableId}`).DataTable()
  if (dt) dt.ajax.reload(null, false)
}

const initPollingTable = () => {
  const dt = $(`#${props.tableId}`).DataTable({
    ajax: {
      url: api.defaults.baseURL + props.url,
      type: 'GET',
      beforeSend: (xhr) => {
        const token = localStorage.getItem('token')
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      },
      dataSrc: (json) => json,
      error: (xhr, error, thrown) => {
        console.error('Ajax Error:', error, xhr.status, xhr.responseText)
      },
    },
    columns: props.columns,
    destroy: true,
    responsive: true,
    order: [[1, 'desc']], // sort by Qty Terjual
    initComplete: function () {
      // reload table sekali agar data langsung muncul
      dt.ajax.reload()
    },
    drawCallback: function () {
      // Edit/Delete tombol jika ada
      $(`#${props.tableId} .edit-btn`)
        .off('click')
        .on('click', function () {
          const data = $(`#${props.tableId}`).DataTable().row($(this).parents('tr')).data()
          emit('edit', data)
        })

      $(`#${props.tableId} .delete-btn`)
        .off('click')
        .on('click', function () {
          const id = $(this).data('id')
          emit('delete', id)
        })
    },
  })

  // polling tiap 10 detik
  pollingInterval = setInterval(() => dt.ajax.reload(null, false), 10000)
}

onMounted(() => {
  initPollingTable()
  window.addEventListener(`refresh-${props.tableId}`, reloadTable)
})

onBeforeUnmount(() => {
  window.removeEventListener(`refresh-${props.tableId}`, reloadTable)
  clearInterval(pollingInterval)
})
</script>
