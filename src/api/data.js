import axios from '@/libs/api.request'
import {AdminUser, AdminRule, AdminRole, AdminRoleRule, RmFile} from './api'
import qs from 'qs'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

//获取所有管理员
export const getAdminUsers = () => {
  return axios.request({
    url: AdminUser,
    method: 'get'
  })
}

//新增或修改管理员
export const saveAdminUser = (params) => {
  delete params.passwdCheck
  if (params.id === 0) {
    delete params.id
    const data = qs.stringify({
      params
    })
    return axios.request({
      url: AdminUser,
      data,
      method: 'post'
    })
  } else {
    delete params.passwdCheck
    if (params.password === '******') {
      delete params.password
    }
    const data = qs.stringify({
      params
    })
    return axios.request({
      url: AdminUser + '/' + params.id,
      data,
      method: 'put'
    })
  }
}

//删除后台管理员
export const delAdminUser = (id) => {
  return axios.request({
    url: AdminUser + '/' + id,
    method: 'delete'
  })
}

//获取所有后台操作
export const getAdminMenus = () => {
  return axios.request({
    url: AdminRule,
    method: 'get'
  })
}

//添加或修改后台操作
export const addAdminMenu = (params) => {
  if (params.id === 0) {
    const data = qs.stringify({
      pid: params.pid,
      type: params.type,
      listorder: params.listorder,
      title: params.title
    })
    return axios.request({
      url: AdminRule,
      data,
      method: 'post'
    })
  } else {
    const data = qs.stringify({
      id: params.id,
      type: params.type,
      listorder: params.listorder,
      title: params.title
    })
    return axios.request({
      url: AdminRule + '/' + params.id,
      data,
      method: 'put'
    })
  }
}

//删除后台操作
export const delAdminMenu = (id) => {
  return axios.request({
    url: AdminRule + '/' + id,
    method: 'delete'
  })
}

//获取所有后台角色
export const getAdminRoles = () => {
  return axios.request({
    url: AdminRole,
    method: 'get'
  })
}

//添加或修改后台角色
export const saveAdminRole = (params) => {
  if (params.id === 0) {
    const data = qs.stringify({
      name: params.name,
      listorder: params.listorder,
      remark: params.remark
    })
    return axios.request({
      url: AdminRole,
      data,
      method: 'post'
    })
  } else {
    const data = qs.stringify({
      id: params.id,
      name: params.name,
      listorder: params.listorder,
      remark: params.remark
    })
    return axios.request({
      url: AdminRole + '/' + params.id,
      data,
      method: 'put'
    })
  }
}

//删除后台角色
export const delAdminRole = (id) => {
  return axios.request({
    url: AdminRole + '/' + id,
    method: 'delete'
  })
}

//获取角色和操作的关联
export const getRoleRule = (id) => {
  return axios.request({
    url: AdminRoleRule + '/' + id,
    method: 'get'
  })
}

//修改角色和操作的关联
export const saveRoleRule = (params) => {
  const data = qs.stringify({
    role_id: params.role_id,
    rule_arr: params.rule_arr
  })
  return axios.request({
    url: AdminRoleRule,
    data,
    method: 'post'
  })
}

//删除文件
export const delFile = (params) => {
  const data = qs.stringify({
    file_path: params.file_path
  })
  return axios.request({
    url: RmFile,
    data,
    method: 'post'
  })
}
