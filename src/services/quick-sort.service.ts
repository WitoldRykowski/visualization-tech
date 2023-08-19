import { reactive } from 'vue'
import { QuickSort } from '@/components'
import type { BasePlayground } from '@/services/SandboxService/types'

interface QuickSortState {}

export type QuickSortPlayground = BasePlayground<QuickSortState, [200, 500, 1000]>

export const getQuickSortPlayground = (): QuickSortPlayground => {
  const state = reactive<QuickSortState>({})

  return {
    state,
    component: QuickSort,
    delays: [200, 500, 1000],
    visualize,
    getState
  }

  function visualize() {
    //
  }

  function getState() {
    return state
  }
}
