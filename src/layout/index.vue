<template>
  <n-layout class="layout" :position="fixedMenu" has-sider>
    <n-layout-sider
      v-if="
        isMixMenuNoneSub &&
        (navMode === 'vertical' || navMode === 'horizontal-mix') &&
        navMode !== 'content'
      "
      show-trigger="bar"
      @collapse="collapsed = true"
      :position="fixedMenu"
      @expand="collapsed = false"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="inverted"
      class="layout-sider"
    >
      <AdnyLogo :collapsed="collapsed" />
      <AdnySlideMenu />
    </n-layout-sider>
    <n-layout :inverted="inverted" :native-scrollbar="false">
      <n-layout-header
        :inverted="getHeaderInverted"
        :position="fixedHeader"
        v-if="navMode !== 'content'"
      >
        <AdnyHeader v-model:collapsed="collapsed" />
      </n-layout-header>
      <n-layout-content
        class="layout-content"
        :class="{ 'layout-default-background': getDarkTheme === false }"
      >
        <div
          class="layout-content-main"
          :class="{
            'layout-content-main-padding': navMode === 'content',
            'layout-content-main-fix': fixedMulti && navMode !== 'content',
            'fluid-header': fixedHeader === 'static'
          }"
        >
          <AdnyTag />
          <div
            class="main-view"
            :class="{
              'main-view-fix': fixedMulti,
              noMultiTabs: !isMultiTabs,
              'mt-3': !isMultiTabs
            }"
          >
            <AdnyMain />
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, unref } from 'vue'
import { AdnyLogo, AdnySlideMenu, AdnyHeader, AdnyMain, AdnyTag } from '@/layout'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { useDesignSetting } from '@/hooks/setting/useDesignSetting'
import { useLoadingBar } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
const collapsed = ref<boolean>(false)
const { getDarkTheme } = useDesignSetting()
const {
  getShowFooter,
  getNavMode,
  getNavTheme,
  getHeaderSetting,
  getMenuSetting,
  getMultiTabsSetting
} = useProjectSetting()

const settingStore = useProjectSettingStore()

const navMode = getNavMode
const fixedHeader = computed(() => {
  const { fixed } = unref(getHeaderSetting)
  return fixed ? 'absolute' : 'static'
})

const isMixMenuNoneSub = computed(() => {
  const mixMenu = settingStore.menuSetting.mixMenu
  const currentRoute = useRoute()
  if (unref(navMode) != 'horizontal-mix') return true
  if (unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot) {
    return false
  }
  return true
})

const fixedMenu = computed(() => {
  const { fixed } = unref(getHeaderSetting)
  return fixed ? 'absolute' : 'static'
})

const isMultiTabs = computed(() => {
  return unref(getMultiTabsSetting).show
})

const fixedMulti = computed(() => {
  return unref(getMultiTabsSetting).fixed
})

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(getNavTheme))
})

const getHeaderInverted = computed(() => {
  const navTheme = unref(getNavTheme)
  return ['light', 'header-dark'].includes(navTheme) ? unref(inverted) : !unref(inverted)
})

const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(getMenuSetting)
  return collapsed.value ? minMenuWidth : menuWidth
})

const getChangeStyle = computed(() => {
  const { minMenuWidth, menuWidth } = unref(getMenuSetting)
  return {
    'padding-left': collapsed.value ? `${minMenuWidth}px` : `${menuWidth}px`
  }
})

const getMenuLocation = computed(() => {
  return 'left'
})

const watchWidth = () => {
  const Width = document.body.clientWidth
  if (Width <= 950) {
    collapsed.value = true
  } else collapsed.value = false
}

onMounted(() => {
  window.addEventListener('resize', watchWidth)
  //挂载在 window 方便与在js中使用
  window['$loading'] = useLoadingBar()
  window['$loading'].finish()
})
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
  transition: all 0.5s ease-in-out;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    min-height: 100vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}
.layout-content-main-padding {
  padding-top: 0;
}
.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0px;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
