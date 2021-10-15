<template>
  <!-- <NMenu
      :options="menuOptions"
      :mode="mode"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :indent="24"
      :expanded-keys="openKeys"
      :value="getSelectedKeys"
      @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded"
    /> -->
  <NMenu
    class="menu-class"
    :inverted="inverted"
    :options="result"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :accordion="true"
    @update:value="changeRouter"
  />
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import { useLoginStore } from '@/store/modules/login'
  import { computed, ref } from 'vue'
  import { useProjectSettingStore } from '@/store/modules/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
  import { generatorMenu, generatorMenuMix } from '@/utils'
  import { constantRouterList } from '@/router'
  defineProps<{}>()
  const constantMenu = generatorMenu(constantRouterList)
  const loginStore = useLoginStore()
  // const menus = computed(() => loginStore.userMenus)
  const result = constantMenu
  const settingStore = useProjectSettingStore()

  // const asyncRouteStore = useAsyncRouteStore()
  const { getNavMode } = useProjectSetting()
  const router = useRouter()
  const route = useRoute()
  const inverted = computed(() => {
    return ['dark', 'header-dark'].includes(settingStore.navTheme)
  })
  const changeRouter = (key, item) => {
    console.log(key)
    router.push({ name: key })
  }
</script>

<style scoped>
  .menu-class {
    color: #fff;
  }
</style>
