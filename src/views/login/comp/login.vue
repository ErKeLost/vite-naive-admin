<template>
  <div>
    <LoginRight />
    <div class="view-account-form">
      <n-form ref="formRef" label-placement="left" size="large" :model="model" :rules="rules">
        <n-form-item path="name">
          <n-input placeholder="请输入用户名" v-model:value="model.name">
            <template #prefix>
              <i class="mdi mdi-github mr-3"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            type="password"
            v-model:value="model.password"
            showPasswordOn
            placeholder="请输入密码"
          >
            <template #prefix>
              <i class="mdi mdi-lock mr-3"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item class="default-color">
          <div class="flex justify-between container">
            <div class="flex-initial">
              <n-checkbox>自动登录</n-checkbox>
            </div>
            <div class="flex-initial order-last">
              <a href="javascript:">忘记密码?</a>
            </div>
          </div>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="large" @click="handleClickLogin" block>登录</n-button>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="large" block @click="pushRegister"
            >没有账号？ 可以注册~</n-button
          >
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLoginStore } from '@/store/modules/login'
  import { setLoginType } from '@/hooks/login/isLoginComponent'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { useMessage } from 'naive-ui'
  import LoginRight from './login-right.vue'
  const loginStore = useLoginStore()

  const message = useMessage()
  const formRef = ref(null)
  const model = ref({
    name: null,
    password: null
  })
  const rules = {
    name: {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur']
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: ['input', 'blur']
    }
  }
  const router = useRouter()
  const pushRegister = () => {
    setLoginType(true)
  }
  const handleClickLogin = () => {
    formRef.value.validate((err: any) => {
      if (!err) {
        loginStore.accountLoginAction(model.value)
        message.success('Valid')
      } else {
        message.error('Invalid')
      }
    })
  }
</script>

<style lang="scss" scoped>
  .container {
    justify-content: space-between;
  }
</style>
