import { ref } from 'vue'
import { getBinarySearchPlayground } from '@/services/binary-search.service'
import * as SandboxTypes from './types'
import { getBubbleSortPlayground } from '@/services/bubble-sort.service'
import { getQuickSortPlayground } from '@/services/quick-sort.service'
import { getStackPlayground } from '@/services/stack.service'
import { getQueuePlayground } from '@/services/queue.service'

export const ALGORITHMS_LIST = ['BinarySearch', 'BubbleSort', 'QuickSort'] as const
export const DATA_STRUCTURES_LIST = ['Stack', 'Queue'] as const

const PLAYGROUND_GENERATORS: SandboxTypes.PlaygroundGenerators = {
  BinarySearch: getBinarySearchPlayground,
  BubbleSort: getBubbleSortPlayground,
  QuickSort: getQuickSortPlayground,
  Stack: getStackPlayground,
  Queue: getQueuePlayground
}

export const Sandbox = () => {
  const state: SandboxTypes.Sandbox = {
    variant: undefined,
    playground: undefined
  }

  return {
    state: state as Readonly<typeof state>,
    createPlaygroundByVariant
  }

  function createPlaygroundByVariant(variant: SandboxTypes.Variant) {
    state.variant = variant

    if (!variant) return

    return PLAYGROUND_GENERATORS[variant]
  }
}

export function generatePlaygroundSettings(): SandboxTypes.PlaygroundSettings {
  const delays = [200, 500, 1000]

  return {
    delays,
    currentDelay: ref(delays[0]),
    isRunning: ref(false)
  }
}
