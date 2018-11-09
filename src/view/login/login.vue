<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import Cookies from 'js-cookie'
import { mapActions } from 'vuex'
import Account from '@/view/com/pro/sign/account/account'

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      // 'handleLogin',
      // 'getUserInfo'
    ]),
    ...mapActions('signinStore', [
      'login'
    ]),
    handleSubmit ({ userName, password }) {
      let account = new Account()
      account.loginKey = 'Browser'
      account.account = userName
      account.password = password
      this.login(account).then(res => {
        if (res.data.isSuccess && res.data.statusCode === 200) {
          Cookies.set('pro-token', res.data.data[0].token, { expires: new Date(res.data.data[0].cookiesExpireTimes) })
          this.$Message.success({ content: res.data.data[0].msg, duration: 3 })
          this.$router.push({
            name: this.$config.homeName
          })
        } else {
          this.$Message.error({ content: res.data.msg, duration: 6 })
        }
      }).catch(result => {
        this.$Message.error({ content: '请求失败！状态码 ' + result.response.status + ' ' + result.response.statusText, duration: 6 })
      })
      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: this.$config.homeName
      //     })
      //   })
      // })
    }
  }
}
</script>

<style>

</style>
