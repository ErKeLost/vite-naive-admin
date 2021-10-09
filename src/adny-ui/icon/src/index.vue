<template>
  <div>
    <i :class="`mdi mdi-${icon} text-${size}xl`"></i>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  size: number
}>()
</script>

<style scoped>

</style>
