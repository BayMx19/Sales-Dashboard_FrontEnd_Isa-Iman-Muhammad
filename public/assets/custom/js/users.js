import api from '@/assets/js/api/api.js'

window.initUsersTable = function (emit) {
  $('#users-table').DataTable({
    ajax: {
      url: api.defaults.baseURL + '/users',
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
      { data: 'name', title: 'Name' },
      { data: 'email', title: 'Email' },
      { data: 'role', title: 'Role' },
      { data: 'status', title: 'Status' },
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
      $('#users-table .edit-btn')
        .off('click')
        .on('click', function () {
          const data = $('#users-table').DataTable().row($(this).parents('tr')).data()
          emit('edit', data)
        })

      $('#users-table .delete-btn')
        .off('click')
        .on('click', function () {
          const id = $(this).data('id')
          emit('delete', id)
        })
    },
  })
}
