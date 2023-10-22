import type { RouteRecordRaw } from 'vue-router'

type Route = Pick<RouteRecordRaw, 'name' | 'path'>

export const Main: Route = {
  name: 'Main',
  path: '/'
}

export const Sandbox: Route = {
  name: 'Sandbox',
  path: '/sandbox'
}
