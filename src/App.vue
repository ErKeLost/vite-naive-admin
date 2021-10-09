<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>
<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { computed, onMounted, onUnmounted } from 'vue'
  import { zhCN, dateZhCN, createTheme, inputDark, datePickerDark, darkTheme } from 'naive-ui'
  import { LockScreen } from '@/components/Lockscreen'
  import { AppProvider } from '@/components/Application'
  import { useRoute } from 'vue-router'
  const themeOverrides = {
    common: {
      primaryColor: '#000',
      primaryColorHover: '#000',
      primaryColorPressed: '#000'
    },
    Button: {
      textColor: '#000'
    },
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#000'
        }
      }
    }
    // ...
  }
</script>

<style></style>
