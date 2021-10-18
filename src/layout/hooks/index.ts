import { computed } from 'vue'
import { useDesignSettingStore } from '@/store/modules/designSetting'
const designStore = useDesignSettingStore()
const systemTheme = computed(() => designStore.appTheme)
const systemBgTheme = computed(() => designStore.bgTheme)


export {
  // 直接获取 默认系统主题
  systemTheme,
  // 直接获取 默认系统背景主题
  systemBgTheme
}
