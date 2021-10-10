import { IForm } from '@/adny-ui/Form'
export const formConfig: IForm = {
  labelWidth: '100',
  labelPlacement: 'left',
  labelAlign: 'right',
  layout: '1 s:2 m:3 l:4 xl:4 2xl:4',
  formItems: [
    {
      type: 'input',
      label: '用户名',
      path: 'username',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      path: 'password',
      label: '密码',
      rules: [],
      placeholder: '请输入密码'
    },
    {
      type: 'input',
      label: '手机号码',
      path: 'phoneNumber',
      rules: [],
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      label: '验证码',
      path: 'selectValue',
      rules: [],
      placeholder: '请输入验证码',
      selectOptions: [
        {
          label: '我是你爹',
          value: 0
        },
        {
          label: '我是你娘',
          value: 1
        }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      path: 'createAt',
      rules: [],
      placeholder: '请选择时间asdasd',
      dateType: 'datetimerange'
    }
  ]
}
