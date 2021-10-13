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
  <!-- <NMenu
    class="menu-class"
    :inverted="inverted"
    :options="menuOptions"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
  /> -->
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useProjectSettingStore } from '@/store/modules/projectSetting'
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
  defineProps<{}>()
  const settingStore = useProjectSettingStore()
  const { getNavMode } = useProjectSetting()
  const inverted = computed(() => {
    return ['dark', 'header-dark'].includes(settingStore.navTheme)
  })
  const menuOptions = [
    {
      label: '且听风吟',
      key: 'hear-the-wind-sing'
    },
    {
      label: '1973年的弹珠玩具',
      key: 'pinball-1973',
      disabled: true,
      children: [
        {
          label: '鼠',
          key: 'rat'
        }
      ]
    },
    {
      label: '寻羊冒险记',
      key: 'a-wild-sheep-chase',
      disabled: true
    },
    {
      label: '舞，舞，舞',
      key: 'dance-dance-dance',
      children: [
        {
          type: 'group',
          label: '人物',
          key: 'people',
          children: [
            {
              label: '叙事者',
              key: 'narrator'
            },
            {
              label: '羊男',
              key: 'sheep-man'
            }
          ]
        },
        {
          label: '饮品',
          key: 'beverage',
          children: [
            {
              label: '威士忌',
              key: 'whisky'
            }
          ]
        },
        {
          label: '食物',
          key: 'food',
          children: [
            {
              label: '三明治',
              key: 'sandwich'
            }
          ]
        },
        {
          label: '过去增多，未来减少',
          key: 'the-past-increases-the-future-recedes'
        }
      ]
    }
  ]
</script>

<style scoped>
  .menu-class {
    color: #fff;
  }
</style>
