import api from '@/assets/js/api/api.js'

export async function registerUser(name, email, password) {
  try {
    const res = await api.post('/register', { name, email, password })
    localStorage.setItem('token', res.data.token)
    return { success: true, token: res.data.token }
  } catch (err) {
    const message = err.response?.data?.message || 'Registrasi gagal'
    return { success: false, message }
  }
}
