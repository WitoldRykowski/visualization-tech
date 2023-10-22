import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import TheMain from '@/views/Main/TheMain.vue'
import TheSandbox from '@/views/Sandbox/TheSandbox.vue'
import { Main, Sandbox } from '@/router/routes'

const routes: RouteRecordRaw[] = [
  { ...Main, component: TheMain },
  { ...Sandbox, component: TheSandbox }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
