<template>
  <main class="picker-login__main main">
    <div class="picker-login__container">
      <div class="login__form-header-wrapper">
        <div class="login__form-header">
          {{ org.meta.basic.name }}
          登录到您的帐户
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <card className="login__form">
          <div class="login__form-userdata">

            <label for="usernameOrEmail"
                   class="login__form-userdata-username">用户名</label>
            <input id="usernameOrEmail" name="user_login" class="form-text-input login__form-userdata-username-input"
                   v-model="form.user_login" v-validate="'required|alpha'"
                   :class="{'input': true, 'is-danger': errors.has('user_login') }" type="text" placeholder="用户名">
            <form-input-validation :isError="errors.has('user_login')" v-show="errors.has('user_login')">
              {{ errors.first('user_login') }}
            </form-input-validation>
            <label for="password" class="login__form-userdata-username">密码</label>
            <input id="password" name="user_pass" type="password"
                   class="form-text-input form-password-input login__form-userdata-username-input"
                   v-model="form.user_pass" autocapitalize="off" v-validate="'required|min:6'"
                   :class="{'input': true, 'is-danger': errors.has('user_pass')}">
            <form-input-validation :isError="errors.has('user_pass')" v-show="errors.has('user_pass')">
              {{ errors.first('user_pass') }}
            </form-input-validation>
          </div>

          <p class="login__form-terms">
            通过以下选项登录即表示，您同意我们的
            <a
              href="//picker.cc/tos/" target="_blank" rel="noopener noreferrer">服务条款</a><!-- react-text: 48 -->。
            <!-- /react-text --></p>
          <div class="login__form-action">
            <button type="submit" class="button form-button is-primary" :class="isLogin ? 'is-busy' : ''">登录</button>
          </div>
        </card>
      </form>
    </div>
    <div class="picker-login__links">
      <a href="https://zh-cn.picker.cc/picker-login.php?action=lostpassword">忘记密码？</a>
      <a href="https://picker.cc">
        <icon name="long-arrow-left" class=" needs-offset-y"></icon>
        首页</a>
    </div>
  </main>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import {Card} from '~/components/card'
  import {setToken, checkSecret, extractInfoFromHash} from '~/utils/auth'
  import FormInputValidation from '~/components/forms/form-input-validation'

  export default {
    layout: 'logged-out',
    middleware: 'anonymous',
    components: {
      Card,
      FormInputValidation
    },
    data () {
      return {
        isLogin: false,
        form: {
          user_login: '',
          user_pass: ''
        }
      }
    },
    computed: {
      orgId () {
        return this.$store.state.org.id
      },
      org () {
        return this.$store.state.org.detail.data
      },
      logo_url () {
        return this.org.basic.logo_url === undefined || null ? '../assets/img/logo.png' : this.org.basic.logo_url
      }
    },
    methods: {
      async handleSubmit () {
        const that = this
        that.isLogin = true
        await this.$validator.validateAll().then(async (result) => {
          if (result) {
            await this.$store.dispatch('login', {form: this.form})
            that.isLogin = false
            this.$router.replace('/apps')
            return
          }
          that.isLogin = false
          console.log('Correct them errors!')
        })
      }
    }
  }
</script>
