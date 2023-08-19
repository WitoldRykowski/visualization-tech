import { reactive } from 'vue'
import { TheStack } from '@/components'
import type { BasePlayground } from '@/services/SandboxService/types'

interface StackState {}

export type StackPlayground = BasePlayground<StackState, [200, 500, 1000]>
export const getStackPlayground = (): StackPlayground => {
  const state = reactive<StackState>({})

  return {
    state,
    component: TheStack,
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
