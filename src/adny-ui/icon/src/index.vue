<template>
  <div :class="{ filp: turn === true }">
    <i :class="`mdi mdi-${icon} text-${size}xl`" :style="`color: ${color}`"></i>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AdnyIcon'
})
</script>
<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    size?: string
    color?: string
    turn?: boolean
  }>(),
  {
    turn: false
  }
)
defineExpose({
  name: 'AdnyIcon'
})
</script>

<style scoped>
.filp {
  transform: rotate(180deg);
}
</style>
