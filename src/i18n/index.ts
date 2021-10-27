import { createI18n } from 'vue-i18n'
import { localesConfig } from './src/config'
export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages: localesConfig
})

export default i18n
