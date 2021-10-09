<template>
  <div>
    <div class="relative min-h-screen flex">
      <div
        class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white"
      >
        <div
          class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-black text-white bg-no-repeat bg-cover relative"
        >
          <img class="full-img" src="~@/assets/images/login.png" />

          <!-- <div class="absolute bg-gradient-to-b from-blue-900 to-blue-500 opacity-75 inset-0 z-0"></div> -->
          <ul class="circles">
            <li v-for="item in 10" :key="item"></li>
          </ul>
        </div>
        <div
          class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white"
        >
          <div class="max-w-md w-full mx-auto space-y-8">
            <div class="text-center">
              <h2 class="mt-6 text-3xl font-bold text-gray-900">Adny Design</h2>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <span class="h-px w-16 bg-gray-200"></span>
              <span class="text-gray-300 font-normal">使用账号密码登录</span>
              <span class="h-px w-16 bg-gray-200"></span>
            </div>
            <!-- <login></login> -->
            <component :is="a === false ? Register : Login"></component>
            <n-button @click="a = !a">注册</n-button>
            <div class="text-center">
              <span class="h-px w-16 bg-gray-400"></span>
              <span class="text-gray-400 font-normal">第三方登录</span>
              <span class="h-px w-16 bg-gray-200"></span>
            </div>
            <div class="flex flex-row justify-center items-center space-x-10">
              <i class="mt-6 text-3xl mdi mdi-github"></i>
              <i class="mt-6 text-3xl mdi mdi-wechat"></i>
              <i class="mt-6 text-3xl mdi mdi-instagram"></i>
              <i class="mt-6 text-3xl mdi mdi-facebook"></i>
            </div>
          </div>
          <img class="absolute img-responsive" src="~@/assets/images/girl.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import AdnyIcon from '@/adny-ui/icon'
import Login from './comp/login.vue'
import Register from './comp/register.vue'
const a = ref(true)
</script>

<style lang="scss" scoped>
.img-responsive {
  right: 0%;
  bottom: 0%;
}
.full-img {
  width: 90%;
  // height: 90%;
  position: absolute;
  z-index: 99;
}
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.8);
  animation: animate 25s linear infinite;
  bottom: -150px;
}
.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}
.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}
.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}
.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}
.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}
.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}
.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}
.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}
.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}
.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}
@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 50%;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 100%;
  }
}
</style>
