import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: 'api/users/login',
        data: {
            user: data
        }
    })
}

// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: 'api/users',
        data: {
            user: data
        }
    })
}

// 获取最近的用户
export const currentUser = () => {
    return request({
        method: 'GET',
        url: 'api/users'
    })
}

// 更新用户
export const updateUser = data => {
    return request({
        method: 'PUT',
        url: 'api/users',
        data
    })
}