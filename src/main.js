import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'

import { Metrics } from '@edgio/rum'
import { install } from '@edgio/prefetch/window'
import installDevtools from '@edgio/devtools/install'
import Router from '@edgio/rum/Router.js'

const app = createApp(App)
app.use(router)
app.mount('#app')

installDevtools()
install({ includeCacheMisses: true })
new Metrics({
  token: '789a5742-3d8d-4894-90ec-6ca44b91f914',
  router: new Router()
    .match('/', ({ setPageLabel }) => setPageLabel('home'))
    .match('/commerce', ({ setPageLabel }) => setPageLabel('commerce'))
    .match('/product/:id', ({ setPageLabel }) => setPageLabel('product/:id')),
}).collect()
