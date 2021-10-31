<template>
  <div>
    <n-form :model="formModel" ref="formRef">
      <n-grid cols="4">
        <n-gi>
          <n-form-item
            :label-placement="formItem.labelPlacement"
            :label="formItem.label"
            v-for="formItem in formData"
            :key="formItem.field"
          >
            <template #label v-if="formItem.labelMessage">
              {{ formItem.label }}
              <n-tooltip trigger="hover" :style="formItem.labelMessageStyle">
                <template #trigger>
                  <n-icon
                    :style="formItem.labelIconStyle"
                    size="18"
                    class="cursor-pointer text-gray-400"
                  >
                    <template v-if="formItem.labelIcon === 'qsMark'">
                      <QuestionCircleOutlined />
                    </template>
                    <template v-else-if="formItem.labelIcon === 'alertMark'">
                      <AlertOutlined />
                    </template>
                    <template v-if="formItem.labelIcon === 'messageMark'">
                      <MessageOutlined />
                    </template>
                  </n-icon>
                </template>
                {{ formItem.labelMessage }}
              </n-tooltip>
            </template>
            <!--判断插槽-->
            <template v-if="formItem.slot && !formItem.component">
              <slot
                :name="formItem.slot"
                :model="formModel"
                :field="formItem.field"
                :value="formModel[formItem.field]"
              ></slot>
            </template>
            <!--NCheckbox-->
            <template v-else-if="formItem.component === 'n-check-box'">
              <n-checkbox-group v-model:value="formModel[formItem.field]">
                <n-space>
                  <n-checkbox
                    v-for="item in formItem.checkboxProps.options"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-space>
              </n-checkbox-group>
            </template>
            <!--NRadioGroup-->
            <template v-else-if="formItem.component === 'n-radio-group'">
              <n-radio-group v-model:value="formModel[formItem.field]">
                <n-space>
                  <n-radio
                    v-for="item in formItem.radiogroupProps.options"
                    :key="item.value"
                    :value="item.value"
                  >{{ item.label }}</n-radio>
                </n-space>
              </n-radio-group>
            </template>
            <template v-else-if="formItem.component === 'n-select'">
              <n-select
                v-model:value="formModel[formItem.field]"
                :options="formItem.selectOptions"
              />
            </template>
            <component
              v-else
              :is="formItem.component"
              v-bind="getComponentProps(formItem)"
              v-model:value="formModel[formItem.field]"
              :class="{ isFull: formItem?.isFull != false }"
            />
            <!--组件后面的内容-->
            <template v-if="formItem.suffix">
              <slot
                :name="formItem.suffix"
                :model="formModel"
                :field="formItem.field"
                :value="formModel[formItem.field]"
              ></slot>
            </template>
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-form>
    <n-button @click="out">输出</n-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, reactive, unref } from 'vue'
import { createPlaceholderMessage } from '@/components/Form/src/helper'
import { formData } from './data.config'
import { DownOutlined, AlertOutlined, MessageOutlined, UpOutlined, QuestionCircleOutlined } from '@vicons/antd'
const out = () => {
  console.log(formModel)
}

const formModel = reactive({})
function getComponentProps(formItem: any) {
  const compProps = formItem?.componentProps ?? {}
  const component = formItem?.component ?? ''
  return {
    clearable: true,
    placeholder: createPlaceholderMessage(unref(component)),
    ...compProps
  }
}
</script>
<style>
.isFull {
  width: 100%;
  justify-content: flex-start;
}

.unfold-icon {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: -3px;
}
</style>
