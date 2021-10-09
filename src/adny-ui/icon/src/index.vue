<template>
  <div>
    <i :class="`mdi mdi-${icon}`"></i>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: "string"
}>()
</script>

<style scoped>

</style>
