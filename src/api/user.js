import axios from '@/libs/api.request'
import {Login, AdminUser} from './api'
import qs from 'qs'

export const login = ({userName, password}) => {
  const data = qs.stringify({
    username: userName,
    password: password
  })
  return axios.request({
    url: Login,
    data,
    method: 'post'
  })
}

export const getUserInfo = (id) => {
  return axios.request({
    url: AdminUser + '/' + id,
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
