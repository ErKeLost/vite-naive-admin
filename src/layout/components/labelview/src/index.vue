<template>
  <div class="tabs-view" :style="getChangeStyle">
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card">
        <span
          class="tabs-card-prev"
          @click="scrollPrev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
        >
          <n-icon size="16" color="#515a6e">
            <LeftOutlined />
          </n-icon>
        </span>
        <span
          class="tabs-card-next"
          @click="scrollNext"
          :class="{ 'tabs-card-next-hide': !scrollable }"
        >
          <n-icon size="16" color="#515a6e">
            <RightOutlined />
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable :list="tabsList" animation="300" item-key="id" class="flex">
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item"
                :class="{ 'active-item': $route.fullPath === element.fullPath }"
                @click.stop="changePage(element)"
              >
                <span>{{ element.meta.title }}</span>
                <n-icon size="15" v-if="element.fullPath !== home">
                  <CloseOutlined />
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown trigger="hover" placement="bottom-end" :options="TabsMenuOptions">
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
import { useMessage } from 'naive-ui'
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

const props = defineProps<{
  collapsed?: boolean
}>()
const designStore = useDesignSettingStore()
const { getNavMode, getHeaderSetting, getMenuSetting, getMultiTabsSetting } = useProjectSetting()
const color = computed(() => designStore.appTheme)
const settingStore = useProjectSettingStore()

const handleClose = () => {}
const tabsViewStore = useTabsViewStore()
const route = useRoute()
const isCurrent = ref(false)
let scrollable = ref(false)
const dropdownX = ref(0)
const dropdownY = ref(0)
const showDropdown = ref(false)
const navScroll: any = ref(null)
const checked = ref(false)
const router = useRouter()
const home = PageEnum.BASE_HOME
const getSimpleRoute = (route) => {
  const { fullPath, hash, meta, name, params, path, query } = route
  return { fullPath, hash, meta, name, params, path, query }
}
let routes = []
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

try {
  const routesStr = storage.get(TABS_ROUTES) as string | null | undefined
  routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)]
} catch (e) {
  routes = [getSimpleRoute(route)]
}

// 初始化标签页
tabsViewStore.initTabs(routes)
const tabsList: any = computed(() => tabsViewStore.tabsList)
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
    width: `calc(100% - ${!fixed ? '0px' : lenNum})`
  }
})
onMounted(() => {
  const containerWidth = navScroll.value.offsetWidth
  const navWidth = navScroll.value.scrollWidth
  // console.log(navWidth)
  // console.log(containerWidth)
})

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
</script>

<style lang="less" scoped>
.tabs-view {
  width: 100%;
  padding: 6px 0;
  display: flex;
  transition: all 0.2s ease-in-out;

  &-main {
    height: 32px;
    display: flex;
    max-width: 100%;
    min-width: 100%;

    .tabs-card {
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
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
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;

        &-item {
          background: var(--color);
          color: var(--text-color);
          height: 32px;
          padding: 6px 16px 4px;
          border-radius: 3px;
          margin-right: 6px;
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
          color: v-bind(getAppTheme);
        }
      }
    }

    .tabs-card-scrollable {
      padding: 0 32px;
      overflow: hidden;
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
    //margin-right: 10px;

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
</style>

