<template>
  <div>
    <LoginRight />
    <div class="view-account-form">
      <n-form ref="formRef" label-placement="left" size="large">
        <n-form-item path="username">
          <n-input placeholder="请输入用户名">
            <template #prefix>
              <i class="mdi mdi-account mr-3"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="phoneValue">
          <n-input placeholder="请输入手机号码">
            <template #prefix>
              <i class="mdi mdi-phone mr-3"></i>
            </template>
          </n-input>
          <n-button class="ml-10">获取验证码</n-button>
        </n-form-item>
        <n-form-item path="usernamae">
          <n-input placeholder="请输入验证码">
            <template #prefix>
              <i class="mdi mdi-security mr-3"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input type="password" showPasswordOn placeholder="请设置密码">
            <template #prefix>
              <i class="mdi mdi-lock mr-3"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input type="password" showPasswordOn placeholder="再次输入密码">
            <template #prefix>
              <i class="mdi mdi-lock mr-3"></i>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item class="default-color">
          <div class="flex justify-between container">
            <div class="flex-initial">
              <n-checkbox>我同意隐私协议</n-checkbox>
            </div>
          </div>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="large" block>注册</n-button>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="large" @click="pushLoginComponent" block
            >注册好喽~，去登录啦</n-button
          >
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LoginRight from './login-right.vue'

  import { setLoginType } from '@/hooks/login/isLoginComponent'
  const pushLoginComponent = () => {
    setLoginType(false)
  }
</script>

<style lang="scss" scoped>
  .container {
    justify-content: space-between;
  }
</style>
