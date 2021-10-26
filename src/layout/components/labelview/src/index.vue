<template>
  <div class="tabs-view" :style="getChangeStyle">
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card" :class="{ 'tabs-card-scrollable': scrollable }">
        <span class="tabs-card-prev" :class="{ 'tabs-card-prev-hide': !scrollable }">
          <n-icon size="16" color="#515a6e">
            <LeftOutlined />
          </n-icon>
        </span>
        <span class="tabs-card-next" :class="{ 'tabs-card-prev-hide': !scrollable }">
          <n-icon size="16" color="#515a6e">
            <RightOutlined />
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable :list="tabsList" animation="300" item-key="id" class="flex">
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item chrome-tab"
                :class="{ 'active-item': currentRoute === element.fullPath }"
                @click.stop="changePage(element)"
                @contextmenu="handleContextMenu($event, element)"
              >
                <span>{{ element.meta.title }}</span>
                <n-icon size="15" v-if="element.fullPath !== home" @click.stop="deleteTab(element)">
                  <CloseOutlined />
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown
          trigger="hover"
          placement="bottom-end"
          @select="closeHandleSelect"
          :options="TabsMenuOptions"
        >
          <div class="tabs-close-btn">
            <n-icon size="16" color="#515a6e">
              <DownOutlined />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        @select="closeHandleSelect"
        placement="bottom-start"
        :options="TabsMenuOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, toRefs, unref, provide, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storage } from '@/utils/Storage'
import { TABS_ROUTES } from '@/store/mutation-types'
import { useTabsViewStore } from '@/store/modules/tabsView'
import { PageEnum } from '@/enums/pageEnum'
import {
  DownOutlined,
  ReloadOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  LeftOutlined,
  RightOutlined
} from '@vicons/antd'
import { renderIcon } from '@/utils'
import { useDesignSetting } from '@/hooks/setting/useDesignSetting'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import Draggable from 'vuedraggable'
import { useDesignSettingStore } from '@/store/modules/designSetting'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import func from '../../../../../vue-temp/vue-editor-bridge'
import { useMessage } from 'naive-ui'

const props = defineProps<{
  collapsed?: boolean
}>()
const designStore = useDesignSettingStore()
const { getNavMode, getHeaderSetting, getMenuSetting, getMultiTabsSetting } = useProjectSetting()
const color = computed(() => designStore.appTheme)
const tabsViewStore = useTabsViewStore()
const settingStore = useProjectSettingStore()
const tabsList: any = computed(() => {
  return tabsViewStore.tabsList
})
const handleClose = () => { }
const message = useMessage()
const route = useRoute()
const isCurrent = ref(false)
const scrollable = ref(false)
const dropdownX = ref(0)
const dropdownY = ref(0)
const showDropdown = ref(false)
const navScroll: any = ref(null)
const checked = ref(false)
const router = useRouter()
const home = PageEnum.BASE_HOME
const currentRoute = ref('')
let routes = []
const getSimpleRoute = (route: any) => {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}
function removeTab(deleteRouter: any) {
  if (tabsList.value.length === 1) {
    return message.warning('这已经是最后一页，不能再关闭了！')
  }
  tabsViewStore.closeCurrentTab(deleteRouter)
  // 如果关闭的是当前页
  if (currentRoute.value === deleteRouter.fullPath) {
    const current = tabsList.value[Math.max(0, tabsList.value.length - 1)]
    currentRoute.value = current.fullPath
    router.push({ path: current.fullPath })
  }
}
const deleteTab = (e) => {
  const { fullPath } = e
  const deleteRouter = tabsList.value.find((item) => item.fullPath === fullPath)
  removeTab(deleteRouter)
}
const handleContextMenu = (e, item) => {
  e.preventDefault()
  showDropdown.value = false
  isCurrent.value = router.currentRoute.value.fullPath === item.fullPath
  nextTick().then(() => {
    showDropdown.value = true
    dropdownX.value = e.clientX
    dropdownY.value = e.clientY
  })
}
const TabsMenuOptions = computed(() => {
  const isDisabled = unref(tabsList).length <= 1
  return [
    {
      label: '刷新当前',
      key: '1',
      icon: renderIcon(ReloadOutlined)
    },
    {
      label: `关闭当前`,
      key: '2',
      disabled: unref(isCurrent) || isDisabled,
      icon: renderIcon(CloseOutlined)
    },
    {
      label: '关闭其他',
      key: '3',
      disabled: isDisabled,
      icon: renderIcon(ColumnWidthOutlined)
    },
    {
      label: '关闭全部',
      key: '4',
      disabled: isDisabled,
      icon: renderIcon(MinusOutlined)
    }
  ]
})

// 刷新页面
const reloadPage = () => {
  router.push({
    path: '/redirect' + unref(route).fullPath
  })
}

try {
  const routesStr = storage.get(TABS_ROUTES) as string | null | undefined
  routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)]
} catch (e) {
  routes = [getSimpleRoute(route)]
}

// 初始化标签页
tabsViewStore.initTabs(routes)

window.addEventListener('beforeunload', () => {
  storage.set(TABS_ROUTES, JSON.stringify(tabsList.value))
})
const isMixMenuNoneSub = computed(() => {
  const mixMenu = settingStore.menuSetting.mixMenu
  const currentRoute = useRoute()
  const navMode = unref(getNavMode)
  if (unref(navMode) != 'horizontal-mix') return true
  return !(unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot)
})
const getChangeStyle = computed(() => {
  const { collapsed } = props
  const navMode = unref(getNavMode)
  const { minMenuWidth, menuWidth }: any = unref(getMenuSetting)
  const { fixed }: any = unref(getMultiTabsSetting)
  let lenNum =
    navMode === 'horizontal' || !isMixMenuNoneSub.value
      ? '0px'
      : collapsed
        ? `${minMenuWidth}px`
        : `${menuWidth}px`
  return {
    left: lenNum,
    width: `calc(100% - ${fixed ? '0px' : '0px'})`
  }
})
onMounted(() => {
  const containerWidth = navScroll.value.offsetWidth
  const navWidth = navScroll.value.scrollWidth
  // console.log(navWidth)
  // console.log(containerWidth)
})
watch(
  route,
  (to) => {
    currentRoute.value = to.fullPath
  },
  { immediate: true }
)
const changePage = (ele: any) => {
  const { fullPath } = ele
  if (fullPath === route.fullPath) return
  router.push({ path: fullPath })
}
watch(
  () => route.fullPath,
  (to) => {
    updateNavScroll()
  },
  { immediate: true }
)
/**
 * @param autoScroll 是否开启自动滚动功能
 */
async function updateNavScroll(autoScroll?: boolean) {
  await nextTick()
  if (!navScroll.value) return
  const containerWidth = navScroll.value.offsetWidth
  const navWidth = navScroll.value.scrollWidth
  // console.log(containerWidth)
  // console.log(navWidth)
  if (containerWidth < navWidth) {
    scrollable.value = true
  } else {
    scrollable.value = false
  }
}
const closeHandleSelect = (key) => {
  console.log(key)

  switch (key) {
    //刷新
    case '1':
      reloadPage()
      break
    //关闭
    case '2':
      break
    //关闭其他
    case '3':
      break
    //关闭所有
    case '4':
      break
  }
  updateNavScroll()
  showDropdown.value = false
}
</script>

<style lang="less" scoped>
.tabs-view {
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  padding: 0 0px 12px 0;
  display: flex;
  transition: all 0.2s ease-in-out;
  border-radius: 8px;
  overflow: hidden;

  &-main {
    height: 32px;
    display: flex;
    max-width: 100%;
    min-width: 100%;

    .tabs-card {
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      // overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;
        .n-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
        }
      }

      .tabs-card-prev {
        left: 0;
      }

      .tabs-card-next {
        z-index: 99;
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        // overflow: hidden;

        &-item {
          background: var(--color);
          color: var(--text-color);
          height: 32px;
          padding: 6px 16px 4px;
          border-radius: 5px;
          margin-right: 10px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          flex: 0 0 auto;

          span {
            float: left;
            vertical-align: middle;
          }

          &:hover {
            color: #515a6e;
          }

          .n-icon {
            height: 22px;
            width: 21px;
            margin-right: -6px;
            position: relative;
            vertical-align: middle;
            text-align: center;
            color: #808695;

            &:hover {
              color: #515a6e !important;
            }

            svg {
              height: 21px;
              display: inline-block;
            }
          }
        }

        .active-item {
          color: v-bind(color);
          box-sizing: border-box;
        }
      }
    }

    .tabs-card-scrollable {
      // overflow: hidden;
      padding: 0 32px;
    }
  }

  .tabs-close {
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: var(--color);
    border-radius: 2px;
    cursor: pointer;
    // margin-right: 10px;

    &-btn {
      color: var(--color);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.tabs-view-default-background {
  background: #f5f7f9;
}

.tabs-view-dark-background {
  background: #101014;
}

.tabs-view-fix {
  position: fixed;
  z-index: 5;
  padding: 6px 19px 6px 10px;
  left: 200px;
}

.tabs-view-fixed-header {
  top: 0;
}
.chrome-tab {
  box-shadow: 0 2px 10px 0 rgb(94 86 105 / 15%);
}
</style>

