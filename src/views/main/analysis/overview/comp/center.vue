<template>
  <div>
    <n-grid x-gap="12" cols="3" responsive="screen" item-responsive>
      <n-gi v-for="item in cardList" span="xs:3 s:3 m:1 l:1 xl:1">
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
                :suffix="list.suffix"
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
import { useI18n } from "vue-i18n";
const { tm } = useI18n();
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
        size: '25px',
        suffix: '(个)'
      },
      {
        title: '增长率',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '65.33',
        fixNumber: 2,
        size: '25px',
        suffix: '%'
      },
      {
        title: '修改文件',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '153',
        fixNumber: 0,
        size: '25px',
        suffix: '(个)'
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
        size: '25px',
        suffix: '(小时)'
      },
      {
        title: '任务进度',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '15.65',
        fixNumber: 2,
        size: '25px',
        suffix: '%'
      },
      {
        title: '完成文件',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '55',
        fixNumber: 0,
        size: '25px',
        suffix: '(个)'
      }
    ]
  },
  {
    title: tm('erkelost'),
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
        size: '25px',
        suffix: '(行)'
      },
      {
        title: 'VUE代码',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '36',
        fixNumber: 0,
        size: '25px',
        suffix: '(行)'
      },
      {
        title: 'DESIGN 组件',
        icon: 'arrow-bottom-right',
        iconColor: 'red',
        endValue: '384',
        fixNumber: 0,
        size: '25px',
        suffix: '(个)'
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
