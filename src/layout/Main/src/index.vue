<template>
  <AdnyThemeMenu />
  <div class="main">
    <RouterView>
      <template #default="{ Component, route }">
        <transition :name="getTransitionName" mode="out-in" appear>
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { unref, computed } from 'vue'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'

import AdnyThemeMenu from '../components/themeMenu.vue'
const { getIsPageAnimate, getPageAnimateType } = useProjectSetting()
// 需要缓存的路由组件
const getTransitionName = computed(() => {
  return unref(getIsPageAnimate) ? unref(getPageAnimateType) : ''
})
</script>

<style scoped lang="less">
.main {
  // padding: 0 150px;
}
</style>
