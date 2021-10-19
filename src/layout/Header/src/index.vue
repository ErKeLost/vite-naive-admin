<template>
  <div class="layout-header flex">
    <!-- 如果为垂直布局时 -->
    <div
      class="layout-header-left"
      v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
    >
      <div class="logo" v-if="navMode === 'horizontal'">
        <img src="~@/assets/images/unknown.svg" alt="" />
        <!-- <h2 v-show="!collapsed" class="title">ERKELOST DESIGN</h2> -->
      </div>
      <AdnySlideMenu mode="horizontal" :inverted="getInverted" />
    </div>
    <!-- 左边的菜单 collapsed-->
    <div class="layout-header-left flex" v-else>
      <div
        class="layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <AdnyIcon icon="menu-open" size="25" turn v-if="collapsed" />
        <AdnyIcon icon="menu-open" size="25" v-else />
      </div>
      <div class="layout-header-trigger layout-header-trigger-min">
        <AdnyIcon icon="refresh" size="25"></AdnyIcon>
      </div>
    </div>
    <div class="layout-header-right flex">
      <div
        class="layout-header-trigger layout-header-trigger-min"
        v-for="item in iconList"
        :key="item.icon.name"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <div v-on="item.eventObject || {}">
              <AdnyIcon :icon="item.icon" size="25" :color="item.color" />
            </div>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar
              size="large"
              round
              src="https://themeselection.com/demo/materio-vuetify-vuejs-admin-template-free/demo/img/1.e2938115.png"
            />
          </div>
        </n-dropdown>
      </div>
      <!-- 设置 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdnySlideMenu } from '@/layout'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { NDialogProvider, useDialog, useMessage } from 'naive-ui'
import { reactive, toRefs, ref, computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/modules/login'
const router = useRouter()
const message = useMessage()
const dialog = useDialog()
const loginStore = useLoginStore()
const { getNavMode, getNavTheme, getHeaderSetting, getMenuSetting, getCrumbsSetting } =
  useProjectSetting()

const props = defineProps<{
  collapsed: boolean
  inverted: boolean
}>()
const emit = defineEmits(['update:collapsed'])
const drawerSetting = ref(null)
// const userStore = useUserStore()

const changeCollapsed = () => {
  console.log(props.collapsed)
  emit('update:collapsed', props.collapsed)
}
const iconList = [
  {
    icon: 'magnify',
    tips: '搜索'
  },
  {
    icon: 'github',
    tips: 'github',
    eventObject: {
      click: () => window.open('https://github.com/erkelost')
    }
  },
  {
    icon: 'youtube',
    tips: 'youtube',
    eventObject: {
      click: () => window.open('https://youtube.com')
    },
    color: 'red'
  },
  {
    icon: 'fullscreen',
    tips: '全屏',
    eventObject: {}
  }
]
const avatarOptions = [
  {
    label: '个人设置',
    key: 1
  },
  {
    label: '退出登录',
    key: 2
  }
]
const avatarSelect = (value: number) => {
  if (value === 2) {
    router.push({ path: '/login' })
    loginStore.logOut()
    localStorage.clear()
  }
}
const { navMode, navTheme, headerSetting, crumbsSetting } = toRefs(
  reactive({
    // username: username || '',
    fullscreenIcon: 'FullscreenOutlined',
    navMode: getNavMode,
    navTheme: getNavTheme,
    headerSetting: getHeaderSetting,
    crumbsSetting: getCrumbsSetting
  })
)
const getInverted = computed(() => {
  const navTheme = unref(getNavTheme)
  return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted
})

const mixMenu = computed(() => {
  return unref(getMenuSetting).mixMenu
})

const getChangeStyle = computed(() => {
  const { collapsed } = props
  const { minMenuWidth, menuWidth }: any = unref(getMenuSetting)
  return {
    left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
    width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`
  }
})

const getMenuLocation = computed(() => {
  return 'header'
})
</script>

<style scoped lang="less">
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 64px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: flex;
    width: 64px;
    height: 64px;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}
</style>
