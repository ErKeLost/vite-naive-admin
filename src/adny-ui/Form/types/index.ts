type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label?: string
  rules?: any[]
  placeholder?: any
  selectOptions?: any[]
  dateType?: string
}

export interface IForm {
  formItems?: IFormItem[]
  labelWidth?: string
  labelAlign?: string
  layout?: string
  labelPlacement?: string
}
