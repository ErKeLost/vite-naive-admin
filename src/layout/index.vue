<template>
  <n-layout class="layout" :position="fixedMenu" has-sider>
    <n-layout-sider
      v-if="
        (navMode === 'vertical' || navMode === 'horizontal-mix') &&
        // content 为内容模式 内容模式时 移除layout sider
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
      :style="{ backgroundImage: `url(${systemBgTheme})` }"
    >
      <AdnyLogo :collapsed="collapsed" />
      <AdnySlideMenu v-model:collapsed="collapsed" />
    </n-layout-sider>

    <n-layout :inverted="inverted" :native-scrollbar="false">
      <n-layout-header
        :inverted="getHeaderInverted"
        :position="fixedHeader"
        v-if="navMode !== 'content'"
        class="layout-header"
        :style="{ backgroundImage: `url(${designStore.bgTheme})` }"
      >
        <AdnyHeader v-model:collapsed="collapsed" :inverted="inverted" />
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
          <div class="layout-content-main-tag">
            <AdnyTag v-if="isMultiTabs" v-model:collapsed="collapsed" />
          </div>
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
      <n-back-top :right="100" />
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
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { systemBgTheme } from './hooks'
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
const designStore = useDesignSettingStore()
const navMode = getNavMode
// header 定位
const fixedHeader = computed(() => {
  const { fixed } = unref(getHeaderSetting)
  return fixed ? 'absolute' : 'static'
})

// 默认 不开启 分割菜单 2021.10.18
// // 分割菜单
// const isMixMenuNoneSub = computed(() => {
//   // 默认 false
//   const mixMenu = settingStore.menuSetting.mixMenu
//   // 还要判断当前 路由 是否为 根路由
//   const currentRoute = useRoute()
//   if (unref(navMode) != 'horizontal-mix') return true
//   if (unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot) {
//     return false
//   }
//   return true
// })

// 菜单 定位
const fixedMenu = computed(() => {
  const { fixed } = unref(getHeaderSetting)
  return fixed ? 'absolute' : 'static'
})

// 是否展示 tagview 组件
const isMultiTabs = computed(() => {
  return unref(getMultiTabsSetting).show
})

// fixed 布局 是否 fixed
const fixedMulti = computed(() => {
  return unref(getMultiTabsSetting).fixed
})

// 翻转颜色 给 header 主题 判断  文本颜色 是否翻转
const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(getNavTheme))
})

// ??? header 反转色
const getHeaderInverted = computed(() => {
  // 根据 暗黑 和 亮色 来 判断颜色是否翻转  默认dark
  const navTheme = unref(getNavTheme)
  console.log(['light', 'header-dark'].includes(navTheme) ? unref(inverted) : !unref(inverted))

  return ['light', 'header-dark'].includes(navTheme) ? unref(inverted) : !unref(inverted)
})

// 判断 是否在 collapsed 状态下 动态修改 菜单 宽度
const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(getMenuSetting)
  return collapsed.value ? minMenuWidth : menuWidth
})


// 监听 浏览器宽度 来 动态修改 菜单 折叠情况
const watchWidth = () => {
  const Width = document.body.clientWidth
  if (Width <= 950) {
    collapsed.value = true
  } else collapsed.value = false
}

// 监听 resize 方法  挂在 loading组件
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
  .layout-header {
    transition: all 0.5s ease-in-out;
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
  margin: 10px;
  position: relative;
  padding-top: 64px;
  .layout-content-main-tag {
    // background: #000;
    // height: 40px;
  }
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
  padding-top: 14px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
