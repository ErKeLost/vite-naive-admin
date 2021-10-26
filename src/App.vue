<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="getDarkTheme"
    :theme-overrides="themeOverrides"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, onMounted, onUnmounted } from 'vue'
import {
  zhCN,
  dateZhCN,
  createTheme,
  inputDark,
  datePickerDark,
  darkTheme,
  GlobalThemeOverrides
} from 'naive-ui'
import { LockScreen } from '@/components/Lockscreen'
import { AppProvider } from '@/components/Application'
import { useRoute } from 'vue-router'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { lighten } from '@/utils/index'

const testGlobalCss: GlobalThemeOverrides = {
}
const designStore = useDesignSettingStore()
const themeOverrides: GlobalThemeOverrides = computed(() => {
  const appTheme = designStore.appTheme
  const lightenStr = lighten(designStore.appTheme, 6)

  return {
    common: {
      // baseColor: '#000',
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr
    },
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#000'
        }
      }
    },
    Card: {
      borderRadius: '5px',
    }
    // ...
  }
})
const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined))
</script>

<style lang="less">
@import "styles/index.less";
</style>
