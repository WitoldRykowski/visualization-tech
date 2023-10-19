import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import TheMain from '@/views/Main/TheMain.vue'
import TheSandbox from '@/views/Sandbox/TheSandbox.vue'

const routes: RouteRecordRaw[] = [
  { name: 'Main', path: '/', component: TheMain },
  { name: 'Sandbox', path: '/sandbox', component: TheSandbox }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
