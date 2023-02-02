import axios from "axios";
import store from '../index'

const baseURL = 'https://openmarket.weniv.co.kr/'

const baseInstance = axios.create({
  baseURL,
  header: {
    Authorization: ''
  },
})

baseInstance.interceptors.request.use((config) => {
  const token = store.getState().user.user.token;
  try {
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`
    }

    return config;
  } catch (error) {
    console.error(error)
  }
})

baseInstance.interceptors.response.use((data) => data)

export const apiRequest = {
  post: (url, data) => baseInstance.post(url, data),
  get: (url, request) => baseInstance.get(url, request),
  put: (url, data) => baseInstance.put(url, data),
  delete: (url, request) => baseInstance.delete(url, request)
}
