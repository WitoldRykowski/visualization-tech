import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/Main/MainView.vue'
import { home, stack, dataStructures } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...home,
      component: MainView
    },
    {
      ...dataStructures,
      component: () =>
        import(
          /* webpackChunkName: "dataStructuresView" */ '@/views/DataStructures/DataStructuresView.vue'
        ),
      children: [
        {
          ...stack,
          component: () =>
            import(/* webpackChunkName: "stack" */ '@/views/DataStructures/Stack/StackView.vue')
        }
      ]
    }
  ]
})

export default router
