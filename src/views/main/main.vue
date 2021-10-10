<template>
  <div>
    <adny-form v-bind="formConfig" v-model="formData"></adny-form>
  </div>
</template>

<script setup lang="ts">
import AdnyForm, { IFormItem } from '@/adny-ui/Form'
import { formConfig } from '../login/config/form-config'
import { ref } from 'vue'
const formData = ref({
  username: '',
  password: '',
  phoneNumber: '',
  selectValue: '',
  createAt: null
})
</script>

<style lang="scss" scoped></style>
