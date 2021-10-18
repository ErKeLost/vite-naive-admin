<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement" :native-scrollbar="false">
    <n-drawer-content :title="title">
      <div class="drawer">
        <n-divider title-placement="center">Adny 主题</n-divider>

        <div class="drawer-setting-item justify-center dark-switch">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-switch v-model:value="designStore.darkTheme" class="dark-theme-switch">
                <template #checked>
                  <n-icon size="14" color="#ffd93b">
                    <SunnySharp />
                  </n-icon>
                </template>
                <template #unchecked>
                  <n-icon size="14" color="#ffd93b">
                    <Moon />
                  </n-icon>
                </template>
              </n-switch>
            </template>
            <span>{{ designStore.darkTheme ? '深' : '浅' }}色主题</span>
          </n-tooltip>
        </div>

        <n-divider title-placement="center">系统主题</n-divider>

        <div class="drawer-setting-item align-items-top">
          <n-color-picker
            :value="designStore.appTheme"
            :modes="['hex']"
            @update:value="changeTheme"
          />
        </div>

        <n-divider title-placement="center">导航栏模式</n-divider>
        <div class="drawer-setting-item align-items-top menu-mode">
          <template v-for="(item, index) in ThemeConfig" :key="item">
            <div class="drawer-setting-item-style align-items-top">
              <n-tooltip placement="top">
                <template #trigger>
                  <div :class="`mode ${item.navClass}`" @click="togNavMode(item.navMode)"></div>
                </template>
                <span>{{ item.navName }}</span>
              </n-tooltip>
              <n-badge
                class="absolute top-7 right-2"
                dot
                color="#19be6b"
                v-if="settingStore.navMode === item.navMode"
              />
            </div>
            <n-divider title-placement="center" v-if="index === 2"></n-divider>
          </template>
        </div>
        <n-divider title-placement="center">导航栏风格</n-divider>

        <div class="drawer-setting-item align-items-top menu-mode">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <div class="mode mode-side" @click="togNavTheme('dark')"></div>
              </template>
              <span>暗色侧边栏</span>
            </n-tooltip>
            <n-badge
              class="absolute top-7 right-2"
              dot
              color="#19be6b"
              v-if="settingStore.navTheme === 'dark'"
            />
          </div>

          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <div class="mode mode-white" @click="togNavTheme('light')"></div>
              </template>
              <span>白色侧边栏</span>
            </n-tooltip>
            <n-badge
              class="absolute top-7 right-2"
              dot
              color="#19be6b"
              v-if="settingStore.navTheme === 'light'"
            />
          </div>
          <div class="drawer-setting-item align-items-top">
            <div class="drawer-setting-item-style">
              <n-tooltip placement="top">
                <template #trigger>
                  <div class="mode mode-black" @click="togNavTheme('header-dark')"></div>
                </template>
                <span>暗色顶栏</span>
              </n-tooltip>
              <n-badge
                class="absolute top-7 right-2"
                dot
                color="#19be6b"
                v-if="settingStore.navTheme === 'header-dark'"
              />
            </div>
          </div>
        </div>

        <n-divider title-placement="center">背景主题</n-divider>

        <div class="drawer-setting-item align-items-top menu-mode">
          <div
            v-for="item in bgConfig"
            :key="item.imgUrl"
            class="drawer-setting-item-style align-items-top theme-bg"
            @click="changeThemeBg(item)"
          >
            <n-tooltip placement="bottom">
              <template #trigger>
                <img :src="item.imgUrl" alt="" />
              </template>
              <span>{{ item.themeName }}</span>
            </n-tooltip>
            <!-- <n-badge
              class="absolute top-7 right-2"
              dot
              color="#19be6b"
              v-if="settingStore.navTheme === 'dark'"
            /> -->
          </div>
        </div>

        <n-alert type="info" :showIcon="true">
          <p>注意在使用背景主题时 请先选中背景主题色</p>
        </n-alert>

        <n-divider title-placement="center">界面功能</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 分割菜单 </div>
          <div class="drawer-setting-item-action">
            <n-switch
              :disabled="settingStore.navMode !== 'horizontal-mix'"
              v-model:value="settingStore.menuSetting.mixMenu"
            />
          </div>
        </div>
        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 背景主题色 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="bgThemeOpen" />
          </div>
        </div>
        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定顶栏 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.headerSetting.fixed" />
          </div>
        </div>
        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 固定多页签 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.multiTabsSetting.fixed" />
          </div>
        </div>

        <n-divider title-placement="center">界面显示</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示重载页面按钮 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.headerSetting.isReload" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑导航 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.crumbsSetting.show" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示面包屑显示图标 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.crumbsSetting.showIcon" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 显示多页签 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.multiTabsSetting.show" />
          </div>
        </div>
        <n-divider title-placement="center">动画</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 禁用动画 </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.isPageAnimate" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> 动画类型 </div>
          <div class="drawer-setting-item-select">
            <n-select v-model:value="settingStore.pageAnimateType" :options="animateOptions" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <n-alert type="warning" :showIcon="false">
            <p>{{ alertText }}</p>
          </n-alert>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref, watch, computed } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { CheckOutlined } from '@vicons/antd'
import { Moon, SunnySharp } from '@vicons/ionicons5'
import { darkTheme } from 'naive-ui'
import { useNotification } from 'naive-ui'
import { animates as animateOptions } from '@/settings/animateSetting'
import { ThemeConfig, bgConfig } from '../config/setting'
export default defineComponent({
  name: 'ProjectSetting',
  components: { CheckOutlined, Moon, SunnySharp },
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 280
    }
  },
  setup(props) {
    const settingStore = useProjectSettingStore()
    const designStore = useDesignSettingStore()
    const notification = useNotification()
    const bgThemeOpen = ref(false)
    const state = reactive({
      width: props.width,
      title: props.title,
      isDrawer: false,
      placement: 'right',
      alertText:
        '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',
      appThemeList: designStore.appThemeList
    })
    const changeTheme = (value: string) => {
      designStore.appTheme = value
    }
    watch(
      () => designStore.darkTheme,
      (to) => {
        settingStore.navTheme = to ? 'header-dark' : 'dark'
      }
    )
    const directionsOptions = computed(() => {
      return animateOptions.find((item) => item.value == unref(settingStore.pageAnimateType))
    })

    function openDrawer() {
      state.isDrawer = true
    }

    function closeDrawer() {
      state.isDrawer = false
    }

    function togNavTheme(theme) {
      settingStore.navTheme = theme
      if (settingStore.navMode === 'horizontal' && ['light'].includes(theme)) {
        settingStore.navTheme = 'dark'
        console.log(settingStore.navTheme)
      }
    }

    function togTheme(color) {
      console.log(color)
      designStore.appTheme = color
    }

    function togNavMode(mode) {
      settingStore.navMode = mode
      settingStore.menuSetting.mixMenu = false
    }
    const changeThemeBg = (item: any) => {
      if (!bgThemeOpen.value) {
        notification.info({
          content: `请先选择背景主题色`,
          meta: `${new Date()}`,
          duration: 2000
        })
      } else {
        designStore.bgTheme = item.imgUrl
      }
    }
    return {
      ...toRefs(state),
      settingStore,
      designStore,
      togNavTheme,
      togNavMode,
      togTheme,
      darkTheme,
      openDrawer,
      closeDrawer,
      animateOptions,
      directionsOptions,
      ThemeConfig,
      changeTheme,
      bgConfig,
      changeThemeBg,
      bgThemeOpen
    }
  }
})
</script>

<style lang="less" scoped>
.change-theme-bg {
  border: 1px solid #fba;
}
.theme-bg {
  margin: 10px 0;
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    &:hover {
      box-shadow: 0 0 5px 5px rgb(149, 211, 219);
    }
  }
}
.drawer {
  .n-divider:not(.n-divider--vertical) {
    margin: 10px 0;
  }

  &-setting-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    flex-wrap: wrap;

    &-style {
      display: inline-block;
      position: relative;
      margin-right: 16px;
      cursor: pointer;
      text-align: center;
    }

    &-title {
      flex: 1 1;
      font-size: 14px;
    }

    &-action {
      flex: 0 0 auto;
    }

    &-select {
      flex: 1;
    }

    .theme-item {
      width: 20px;
      min-width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #eee;
      border-radius: 2px;
      margin: 0 5px 5px 0;
      text-align: center;

      .n-icon {
        color: #fff;
      }
    }
  }

  .align-items-top {
    align-items: flex-start;
    padding: 2px 0;
  }

  .justify-center {
    justify-content: center;
  }

  .dark-switch .n-switch {
    ::v-deep(.n-switch__rail) {
      background-color: #000e1c;
    }
  }
}
.menu-mode {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 10px;
  .mode {
    position: relative;
    width: 50px;
    height: 45px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    background-color: #e1e3e6;
    // margin-bottom: 10px;
    // box-shadow: 0 0 15px 1px #aaa;
    transition: 0.3s;
    &:hover {
      box-shadow: 0 0 15px 1px #666;
    }
    &::before,
    &::after {
      pointer-events: none;
    }
    &-white {
      border: 1px solid #eee;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 100%;
        background-color: #ffffff;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background-color: #ffffff;
      }
    }
    &-black {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 100%;
        background-color: #181818;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background-color: #181818;
      }
    }
    &-top {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background-color: #131313;
      }
    }
    &-side {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 100%;
        background-color: #131313;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 15px;
        width: 100%;
        height: 10px;
        background-color: #fff;
      }
    }
    &-head {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
        background-color: #ffffff;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0px;
        left: 0;
        width: 15px;
        height: calc(100% - 0px);
        background-color: rgb(22, 22, 22);
      }
    }
    &-single {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 100%;
        // background-color: #fff;
      }
    }
    i {
      position: absolute;
      right: 2px;
      bottom: 2px;
      display: none;
    }
    &.active i {
      display: block;
      color: #409eff;
    }
  }
}
.mode-hover {
  &:hover {
    box-shadow: 0 0 15px 1px #666;
  }
}
</style>
