<template>
  <n-grid
    cols="1 s:2 m:6 l:6 xl:5 2xl:5"
    item-responsive
    responsive="screen"
    :x-gap="12"
    :y-gap="8"
  >
    <n-gi span="s:2 m:3 l:3 xl:2">
      <n-card class="shadow-md">
        <div class="flex">
          <n-grid cols="1 s:2 m:4 l:5 xl:5 2xl:5" item-responsive responsive="screen">
            <n-gi span="s:2 m:2 l:2 xl:2">
              <div>
                <div class="flex flex-col items-center justify-around">
                  <img class="rounded-full w-48 bord" src="~@/assets/images/avator.jpg" alt />
                  <span class="title-span px-3 rounded-xl mt-6">Pro</span>
                </div>
              </div>
            </n-gi>
            <n-gi span="s:2 m:3 l:3 xl:3">
              <div class="flex px-10 flex-col justify-between mt-4">
                <span class="text-3xl text-gray-400">{{ tm('erkelost') }} & {{ tm('adny') }}</span>
                <span class="py-2 text-1xl text-gray-400">{{ tm('product')}}</span>
                <span class="py-2 name">{{ tm('adny')}}.com</span>
                <n-space>
                  <n-tag size="small" closable>Adny-Nuxt</n-tag>
                  <n-tag size="small" type="success" closable>Adny-Design</n-tag>
                  <n-tag size="small" type="warning" closable>Adny-Admin</n-tag>
                  <n-tag size="small" type="error" closable>Adny-Cli</n-tag>
                  <n-tag size="small" type="info" closable>Adny-Frame</n-tag>
                </n-space>
                <div class="flex justify-between pt-2">
                  <AdnyIcon icon="instagram" color="#fba" size="25"></AdnyIcon>
                  <AdnyIcon icon="wechat" color="#67C23A" size="25"></AdnyIcon>
                  <AdnyIcon icon="github" size="25"></AdnyIcon>
                  <AdnyIcon icon="facebook" size="25" color="#3c9bff"></AdnyIcon>
                </div>
              </div>
            </n-gi>
          </n-grid>
        </div>
      </n-card>
    </n-gi>
    <n-gi span="s:2 m:3 l:3 xl:3">
      <n-card class="text-gray-400 shadow-md" title="Project Set">
        <div class="py-3.5">
          <n-tabs type="line">
            <n-tab-pane name="oasis" tab="Github" class="flex flex-nowrap">
              <n-grid cols="4" responsive="screen" item-responsive :y-gap="24">
                <n-gi v-for="item in fileList" span="xs:2 s:2 m:2 l:2 xl:1">
                  <div class="relative flex mt-4">
                    <img class="px-3" :src="item.src" />
                    <span class="absolute bottom-6 left-5 text-xs font-semibold">{{ item.file }}</span>
                    <span
                      class="absolute bottom-1 left-5 text-xs font-semibold"
                    >{{ `${item.count} Files` }}</span>
                  </div>
                </n-gi>
              </n-grid>
            </n-tab-pane>
            <n-tab-pane name="the beatles" tab="Gitee"></n-tab-pane>
            <n-tab-pane name="jay chou" tab="掘金"></n-tab-pane>
          </n-tabs>
        </div>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from "vue-i18n";
import { useDesignSettingStore } from '@/store/modules/designSetting'
import file1 from '@/assets/images/file1.svg'
import file2 from '@/assets/images/file2.svg'
import file3 from '@/assets/images/file3.svg'
import file4 from '@/assets/images/file4.svg'
const { tm } = useI18n();
const designStore = useDesignSettingStore()
const color = computed(() => designStore.appTheme)
const fileList = [
  {
    src: file1,
    file: 'ADNY-UI',
    count: 156
  },
  {
    src: file2,
    file: 'ADNY-CLI',
    count: 59
  },
  {
    src: file3,
    file: 'ADNY-FRAME',
    count: 78
  },
  {
    src: file4,
    file: 'ADNY-ADMIN',
    count: 138
  }
]
</script>

<style scoped lang="less">
.title-span {
  color: white;
  background: v-bind(color);
}
.bord {
  padding: 10px;
  border: 3px dashed;
  border-color: v-bind(color);
}
.name {
  color: v-bind(color);
  font-weight: 600;
}
</style>
