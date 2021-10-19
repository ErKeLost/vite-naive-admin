<template>
  <n-button class="fixed circle w-12 h-12 z-50 top-80 right-0" type="primary" @click="openSetting">
    <n-tooltip placement="bottom-end">
      <template #trigger>
        <div class="icon-class">
          <AdnyIcon icon="application-cog-outline" size="22" />
        </div>
      </template>
      <span>项目配置</span>
    </n-tooltip>
  </n-button>
  <ProjectSetting ref="drawerSetting" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectSetting from './project-setting.vue'
const drawerSetting = ref(null)
const openSetting = () => {
  const { openDrawer } = drawerSetting.value
  openDrawer()
}
</script>

<style scoped lang="less">
// .icon-class {
//   padding: 10px 12px;
//   border-radius: 10px;
//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;
//   border: 3px solid #000;
//   display: inline-block;
//   border-right-width: 0px;
// }
.circle {
  border-radius: 50%;
}
</style>
