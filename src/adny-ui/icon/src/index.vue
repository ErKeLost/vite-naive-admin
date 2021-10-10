<template>
  <div>
    <i :class="`mdi mdi-${icon} text-${size}xl`" :style="`color: ${color}`"></i>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  size: string
  color?: string
}>()
</script>

<style scoped>
</style>
