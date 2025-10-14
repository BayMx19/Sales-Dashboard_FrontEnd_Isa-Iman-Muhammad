import api from '@/assets/js/api/api.js'

export async function loginUser(email, password) {
  try {
    const res = await api.post('/login', { email, password })
    localStorage.setItem('token', res.data.token)
    return { success: true, token: res.data.token }
  } catch (err) {
    const message = err.response?.data?.message || 'Login gagal'
    return { success: false, message }
  }
}
