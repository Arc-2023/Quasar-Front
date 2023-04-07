import { createPinia } from 'pinia'

export default function ({ app }) {
  const pinia = createPinia()

  app.use(pinia)
}
