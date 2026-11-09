import axios from 'axios'

// O site é público: não tem login nem token. Só o formulário de orçamento
// (POST /contact-requests) fala com a API.
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000/api',
})

export default api
