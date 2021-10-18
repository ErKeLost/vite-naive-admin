<template>
  <NMenu
    class="menu-class"
    :inverted="inverted"
    :options="menus"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    label-field="name"
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
import { generatorMenu, generatorMenuMix, generatorMenuDynamic } from '@/utils'
import { constantRouterList } from '@/router'
import { useTabsViewStore } from '@/store/modules/tabsView'
withDefaults(
  defineProps<{
    mode?: string
    collapsed?: boolean
    location?: string
  }>(),
  {
    mode: 'vertical',
    location: 'left'
  }
)
const loginStore = useLoginStore()
const dynamicMenu = generatorMenuDynamic(loginStore.userMenus)
const constantMenu = generatorMenu(constantRouterList)
const menus = computed(() => {
  return [...dynamicMenu, ...constantMenu]
})

// const result = constantMenu
const settingStore = useProjectSettingStore()
const tabsViewStore = useTabsViewStore()

// const asyncRouteStore = useAsyncRouteStore()
const { getNavMode } = useProjectSetting()
const router = useRouter()
const route = useRoute()
const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(settingStore.navTheme)
})
const changeRouter = (key: any, item: any) => {
  router.push({ path: item.url })
  tabsViewStore.addTabs(item)
}
</script>

<style scoped>
.menu-class {
  color: #fff;
}
</style>
