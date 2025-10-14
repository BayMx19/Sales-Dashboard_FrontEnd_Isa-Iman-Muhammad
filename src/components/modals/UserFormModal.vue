<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="saveUser">
          <div class="modal-header">
            <h5 class="modal-title color-black">
              {{ editData ? 'Edit User' : 'Tambah User' }}
            </h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="color-black">Nama</label>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="color-black">Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="color-black">Role</label>
              <select v-model="form.role" class="form-select" required>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div class="mb-3" v-if="!editData">
              <label class="color-black">Password</label>
              <input v-model="form.password" type="password" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="color-black">Status</label>
              <select v-model="form.status" class="form-select" required>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import api from '@/assets/js/api/api.js'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'refresh'])

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'User',
  status: 'ACTIVE',
})

watch(
  () => props.editData,
  (val) => {
    if (val) Object.assign(form, val)
    else {
      form.name = ''
      form.email = ''
      form.password = ''
      form.role = 'User'
      form.status = 'ACTIVE'
    }
  },
  { immediate: true },
)

const saveUser = async () => {
  try {
    if (props.editData) {
      await api.put(`/users/${props.editData.id}`, form)
    } else {
      await api.post('/users', form)
    }
    emit('refresh')
    emit('close')
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan user')
  }
}
</script>
