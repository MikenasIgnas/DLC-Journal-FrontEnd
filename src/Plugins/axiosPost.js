import axios from 'axios'

export default async (url, input) => {
  const api = axios.create({baseURL: 'http://localhost:4001'})
  const res = await api.post(url, input)
  return res.data
}