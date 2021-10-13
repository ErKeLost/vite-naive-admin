import { App } from 'vue'
import AdnyIcon from '@/adny-ui/Icon'

const components = [AdnyIcon]

export function registerAdnyUi(app: App) {
  components.forEach((item) => {
    app.component(item.name, item)
  })
}
