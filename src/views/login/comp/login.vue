<template>
  <div class="view-account-form">
    <n-form ref="formRef" label-placement="left" size="large">
      <n-form-item path="username">
        <n-input placeholder="请输入用户名">
          <template #prefix>
            <i class="mdi mdi-github"></i>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input type="password" showPasswordOn placeholder="请输入密码">
          <template #prefix>
            <i class="mdi mdi-lock"></i>
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
        <n-button type="primary" size="large" block>登录</n-button>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" size="large" block @click="pushRegister"
          >没有账号？ 可以注册~</n-button
        >
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { setLoginType } from '@/hooks/login/isLoginComponent'

const pushRegister = () => {
  setLoginType(true)
}
</script>

<style lang="scss" scoped>
.container {
  justify-content: space-between;
}
</style>
