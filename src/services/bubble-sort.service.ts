import { reactive } from 'vue'
import { BubbleSort } from '@/components'
import type { BasePlayground } from '@/services/SandboxService/types'

interface BubbleSortState {}

export type BubbleSortPlayground = BasePlayground<BubbleSortState, [200, 500, 1000]>

export const getBubbleSortPlayground = (): BubbleSortPlayground => {
  const state = reactive<BubbleSortState>({})

  return {
    state,
    component: BubbleSort,
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
