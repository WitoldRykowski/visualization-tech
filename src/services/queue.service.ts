import { reactive } from 'vue'
import { TheQueue } from '@/components'
import type { BasePlayground } from '@/services/SandboxService/types'

interface QueueState {}

export type QueuePlayground = BasePlayground<QueueState, [200, 500, 1000]>

export const getQueuePlayground = (): QueuePlayground => {
  const state = reactive<QueueState>({})

  return {
    state,
    component: TheQueue,
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
