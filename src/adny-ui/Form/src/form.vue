<template>
  <div class="adny-form">
    <n-form
      ref="formRef"
      :model="formData"
      :label-placement="labelPlacement"
      :label-width="labelWidth"
      :label-align="labelAlign"
    >
      <n-grid x-gap="24" :cols="layout" responsive="screen">
        <template v-for="item in formItems" :key="item.label">
          <n-gi>
            <n-form-item :label="item.label" :rules="item.rules" :path="item.path">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <n-input :placeholder="item.placeholder" v-model:value="formData[item.path]" />
              </template>
              <template v-else-if="item.type === 'select'">
                <n-select
                  :placeholder="item.placeholder"
                  :options="item.selectOptions"
                  v-model:value="formData[item.path]"
                />
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <n-date-picker
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  :type="item.dateType"
                  v-model:value="formData[item.path]"
                />
              </template>
            </n-form-item>
          </n-gi>
        </template>
      </n-grid>
    </n-form>
    <n-button block @click="handler">登录</n-button>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'
const props = withDefaults(
  defineProps<{
    formItems: IFormItem
    labelPlacement: string
    labelWidth?: string
    labelAlign?: string
    layout?: string
    modelValue: any
  }>(),
  {
    formItems: () => [],
    labelPlacement: 'left',
    labelWidth: '100',
    labelAlign: 'left',
    layout: '1 s:2 m:3 l:4 xl:4 2xl:4'
  }
)
const emit = defineEmits(['update:modelValue'])
const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    console.log(newValue)
    emit('update:modelValue', newValue)
  },
  { deep: true }
)
const handler = () => {
  console.log(formData.value)
}
</script>

<style lang="scss" scoped>
.adny-form {
  padding-top: 24px;
}
</style>
