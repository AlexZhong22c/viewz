<template>
  <div class="demo-form__wrapper">
    <form class="demo-form" @submit.prevent="onSubmit">
      <h1>登陆</h1>
      <demo-form-row label="邮箱" :error="errors.email">
        <z-input type="text" v-model="user.email"></z-input>
      </demo-form-row>
      <demo-form-row label="密码" :error="errors.password">
        <z-input type="password" v-model="user.password"></z-input>
      </demo-form-row>

      <div>
        <z-button class="demo-form__ok" type="submit">提交</z-button>
      </div>
    </form>
  </div>
</template>

<script>
import ZButton from './button/button'
import ZInput from './input'
import DemoFormRow from './demo-form-row'
import DemoFormMixin from '../demo-form-mixin'

export default {
  name: 'demo',
  components: { ZButton, ZInput, DemoFormRow },
  mixins: [DemoFormMixin],
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      rules: [
        { key: 'email', pattern: 'email', required: true },
        { key: 'password', minLength: 6, required: true }
      ]
    }
  },
  created () {},
  methods: {
    onSubmit () {
      this.myValidate(this.user)
      console.log(this.errors)
    }
  }
}
</script>

<style lang="scss">
  .demo-form__wrapper {
    display: flex;
    justify-content: center;
  }
  .demo-form {
    background: white;
    padding: 24px;
    border-radius: 8px;
    margin-top: 36px;
    min-height: 60vh;
  }
  .demo-form__ok {
    width: 100%;
    margin-top: 24px;
  }
</style>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
