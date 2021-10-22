<template>
  <div class="container-card">
    <slot></slot>
    <div class="container">
      <div>
        <div class="slot-title">
          <slot name="title"></slot>
        </div>
        <div class="slot-subtitle">
          <slot name="subtitle"></slot>
        </div>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
    </div>
    <div class="slot-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<script>
export default {
  name: 'AdnyCard'
}
</script>
<style scoped>
.container-card {
  /* overflow: hidden; */
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgb(94 86 105 / 10%);
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
}
.container {
  display: flex;
}
.slot-title {
  padding: 16px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}
.slot-subtitle {
  padding: 0 16px 16px;
  color: #00000099;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: 0.0071428571em;
}
.slot-action {
  align-items: center;
  display: flex;
  padding: 8px;
}
</style>
