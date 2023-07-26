import { type RouteRecordRaw } from 'vue-router'

export type AppRoute = Pick<RouteRecordRaw, 'path' | 'name'>

export const home: AppRoute = {
  name: 'Home',
  path: '/'
}

export const dataStructures = generateAppRouteByName('DataStructures')

export const stack = generateDataStructureRoute('Stack')

function generateDataStructureRoute(name: string): AppRoute {
  const route = generateAppRouteByName(name)

  route.path = `${dataStructures.path}${route.path}`

  return route
}

function generateAppRouteByName(name: string): AppRoute {
  return {
    name,
    path: `/${toKebabCase(name)}`
  }

  function toKebabCase(name: string) {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }
}
