import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// Interceptor para añadir el token a todas las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  getAll() {
    return apiClient.get('/users')
  },
  getnickName(nickname) {
    return apiClient.get(`/users/${nickname}`)
  },
  login(credentials) {
    return apiClient.post('/login', credentials)
  }
}
