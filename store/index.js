const cookieparser = process.server ? require('cookieparser') : undefined

// 防止数据冲突，务必把state定义成函数，返回数据对象

export const state = () => {
    return {
        // 当前登录用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        // req是请求对象，commit是store的commit方法
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
            // No valid cookie found
            }
        }
        commit('setUser', user)
    }
}