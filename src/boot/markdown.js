import { boot } from 'quasar/wrappers'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default boot(({ app }) => {
  app.use(mavonEditor)
})
