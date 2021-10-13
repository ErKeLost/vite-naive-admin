<template>
  <div>
    <div class="relative min-h-screen flex">
      <div
        class="
          flex flex-col
          sm:flex-row
          items-center
          md:items-start
          sm:justify-center
          md:justify-start
          flex-auto
          min-w-0
          bg-white
        "
      >
        <login-animate></login-animate>
        <div
          class="
            md:flex
            md:items-center
            md:justify-center
            w-full
            sm:w-auto
            md:h-full
            w-2/5
            xl:w-2/5
            p-8
            md:p-10
            lg:p-14
            sm:rounded-lg
            md:rounded-none
            bg-white
          "
        >
          <div class="max-w-md w-full mx-auto space-y-8">
            <!-- <login-right></login-right> -->
            <transition :name="getTransitionName" mode="out-in" appear>
              <component :is="isLogin === true ? Register : Login"></component>
            </transition>
            <other-login-type v-if="!isLogin"></other-login-type>
          </div>
          <img class="absolute w-60 img-responsive" src="~@/assets/images/love-black.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, unref, computed } from 'vue'
import AdnyIcon from '@/adny-ui/icon'
import Login from './comp/login.vue'
import Register from './comp/register.vue'
import LoginAnimate from './comp/login-animate.vue'
import LoginRight from './comp/login-right.vue'
import OtherLoginType from './comp/other-login-type.vue'
import { isLogin } from '@/hooks/login/isLoginComponent'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
const { getIsPageAnimate, getPageAnimateType } = useProjectSetting()
const getTransitionName = computed(() => {
  return unref(getIsPageAnimate) ? unref(getPageAnimateType) : ''
})
console.log(getTransitionName.value)
</script>

<style lang="less" scoped>
@import '@/styles/index.less';
.img-responsive {
  right: 0%;
  bottom: 0%;
  z-index: 999;
}
</style>
