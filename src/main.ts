import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import quasarConfiguration from './quasar.config'

import App from './App.vue'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(Quasar, quasarConfiguration)
app.use(router)

app.mount('#app')
