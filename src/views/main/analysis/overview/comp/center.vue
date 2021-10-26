<template>
  <div>
    <n-grid x-gap="12" :cols="3">
      <n-gi v-for="item in cardList">
        <n-card :title="item.title" class="shadow-md font-bold">
          <template #header-extra>
            <n-dropdown trigger="hover">
              <n-button>Daily</n-button>
            </n-dropdown>
          </template>
          <div class="flex justify-between items-center">
            <AdnyCountTo fontSize="30px" :endValue="item.endValue" :declineRate="item.declineRate"></AdnyCountTo>
            <AdnyIcon :icon="item.titleIcon" size="25" />
          </div>
          <div class="flex justify-between items-center">
            <div v-for="list in item.content">
              <AdnyCountTo
                :size="list.size"
                :fixNumber="list.fixNumber"
                :endValue="list.endValue"
                :countIcon="list.icon"
                :iconColor="list.iconColor"
              ></AdnyCountTo>
              <div>{{ list.title }}</div>
            </div>
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useDesignSettingStore } from '@/store/modules/designSetting'
const designStore = useDesignSettingStore()
const color = computed(() => designStore.appTheme)
const cardList = [
  {
    title: '今日提交文件',
    titleIcon: 'github',
    declineRate: '3.5',
    endValue: '351',
    content: [
      {
        title: '注册用户',
        icon: 'arrow-top-right',
        iconColor: '#67C23A',
        endValue: '125',
        fixNumber: 0,
        size: '25px'
      },
      {
        title: '增长率',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '65',
        fixNumber: 2,
        size: '25px'
      },
      {
        title: '修改文件总量',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '153',
        fixNumber: 0,
        size: '25px'
      }
    ]
  },
  {
    title: '安东尼娅',
    titleIcon: 'instagram',
    declineRate: '4.8',
    endValue: '195',
    content: [
      {
        title: '学习时常',
        icon: 'arrow-top-right',
        iconColor: '#67C23A',
        endValue: '210',
        fixNumber: 0,
        size: '25px'
      },
      {
        title: '任务进度',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '15',
        fixNumber: 2,
        size: '25px'
      },
      {
        title: '目标完成文件数量',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '55',
        fixNumber: 0,
        size: '25px'
      }
    ]
  },
  {
    title: '埃克罗斯特',
    titleIcon: 'facebook',
    declineRate: '6.8',
    endValue: '32',
    content: [
      {
        title: '今日代码总量',
        icon: 'arrow-top-right',
        iconColor: '#67C23A',
        endValue: '186',
        fixNumber: 0,
        size: '25px'
      },
      {
        title: 'VUE代码行数',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '36',
        fixNumber: 0,
        size: '25px'
      },
      {
        title: 'DESIGN 组件个数',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '384',
        fixNumber: 0,
        size: '25px'
      }
    ]
  }
]
</script>
<style scoped>
.color {
  color: v-bind(color);
}
</style>
