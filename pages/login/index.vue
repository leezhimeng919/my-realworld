<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in':'Sign up'}}</h1>
          <p class="text-xs-center">
              <nuxt-link :to="loginRoute">{{ isLogin ? 'Need an account?' : 'Have an account?' }}</nuxt-link>
          </p> 

          <ul class="error-messages">
            <!-- <template v-for="(messages, field) in errors" :key=""> -->
                <!-- <li v-for="(message, i) in messages" :key="messages + i"> {{ field }} {{ message }}</li> -->
                <li  v-for="(messages, field) in errors" :key="messages">{{ field}} {{ messages}}</li>
            <!-- </template> -->
          </ul>

          <form  @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                minlength="8"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in':'Sign up'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
// 仅在客户端加载js-cookie包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'notauthenticated',
  name: "LoginIndex",
  computed: {
    isLogin() {
        return this.$route.name === 'login'
    },
    loginRoute() {
        return this.isLogin ? '/register' : '/login'
    }
  },
  data() {
    return {
      // 用户信息
      user: {
        email: '',
        password: '',
        username: ''
      },
      // 错误信息
      errors: {}
    }
  },
  methods: {
    async onSubmit(){
      try {
           // 使用submit.prevent组织表单提交的默认事件
          // 请求用户数据
          const { data } = this.isLogin ? await login(this.user) : await register(this.user)
          console.log(data)
          // 共享登录的用户信息
          this.$store.commit('setUser', data.user)
          // 保存用的的登录状态
          Cookie.set('user', data.user)
          // 跳转至首页
          this.$router.push('/')
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }
      
    }
  },

};
</script>

<style>
</style>