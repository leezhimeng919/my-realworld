// Nuxt.js配置文件  
// node.js文件
module.exports = {
    router: {
        linkActiveClass: 'active',
        // 自定义路由表规则
        extendRoutes(routes, resolve) {
            // 清除nuxt基于pages目录默认生成的路由表规则
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    children: [
                        {
                            name: 'home',
                            path: '',
                            component: resolve(__dirname, 'pages/home')
                        },
                        {
                            name: 'login',
                            path: '/login',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            name: 'register',
                            path: '/register',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            name: 'profile',
                            path: '/profile/:username',
                            component: resolve(__dirname, 'pages/profile')
                        },
                        {
                            name: 'settings',
                            path: '/settings',
                            component: resolve(__dirname, 'pages/settings')
                        },
                        {
                            name: 'article',
                            path: '/article/:slug',
                            component: resolve(__dirname, 'pages/article')
                        },
                        {
                            name: 'editor',
                            path: '/editor',
                            component: resolve(__dirname, 'pages/editor')
                        }
                    ]
                }
            ])
            // routes.push({
            // name: 'custom',
            // path: '*',
            // component: resolve(__dirname, 'pages/404.vue')
            // })
        }
    },
    server: {
        host: '0.0.0.0',
        port: '3000'
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/date.js'
    ]
    // build: {
    //     babel:{
    //        plugins:[
    //          ["@babel/plugin-proposal-private-methods", { "loose": true }]
    //        ]
    //     }
    // }
}
