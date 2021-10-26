import { App } from 'vue'
import AdnyIcon from '@/adny-ui/Icon'
import AdnyCountTo from '@/adny-ui/CountTo'
import AdnyCard from '@/adny-ui/Card'
const components = [AdnyIcon, AdnyCountTo, AdnyCard]

export function registerAdnyUi(app: App) {
  components.forEach((item) => {
    app.component(item.name, item)
  })
}
