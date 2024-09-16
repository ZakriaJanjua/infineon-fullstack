import axios from 'axios'
import Cookies from 'js-cookie';
import { logout } from './lib/utils';

export const axiosbase = axios.create({
   baseURL: import.meta.env.VITE_BASEURL,
});

axiosbase.interceptors.request.use((config) => {
   const token = Cookies.get('token')
   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }
   return config
}, (error) => {
   return Promise.reject(error)
})

axiosbase.interceptors.response.use((response) => response, (error) => {
   if (error.response && error.response.status === 401) {
      logout()
   }
   return Promise.reject(error)
})