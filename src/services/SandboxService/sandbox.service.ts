import { ref } from 'vue'
import { getBinarySearchPlayground } from '@/services/binary-search.service'
import * as SandboxTypes from './types'
import { getBubbleSortPlayground } from '@/services/bubble-sort.service'
import { getQuickSortPlayground } from '@/services/quick-sort.service'
import { getStackPlayground } from '@/services/stack.service'
import { getQueuePlayground } from '@/services/queue.service'
import type { Playground } from './types'

export const ALGORITHMS_LIST = ['BinarySearch', 'BubbleSort', 'QuickSort'] as const
export const DATA_STRUCTURES_LIST = ['Stack', 'Queue'] as const

const PLAYGROUND_GENERATORS: SandboxTypes.PlaygroundGenerators = {
  BinarySearch: getBinarySearchPlayground,
  BubbleSort: getBubbleSortPlayground,
  QuickSort: getQuickSortPlayground,
  Stack: getStackPlayground,
  Queue: getQueuePlayground
}

export const Sandbox = (() => {
  const state: SandboxTypes.Sandbox = {
    variant: ref(undefined),
    delay: ref(0),
    isRunning: ref(false),
    playground: undefined,
    visualize: () => {}
  }

  return {
    state: state as Readonly<typeof state>,
    createPlaygroundByVariant,
    setDelay
  }

  function setDelay(delay: number) {
    state.delay.value = delay
  }

  function createPlaygroundByVariant(variant: SandboxTypes.Variant) {
    setDefaultState()

    if (variant) {
      const playground = PLAYGROUND_GENERATORS[variant]()

      setState(playground)
    }

    function setDefaultState() {
      state.variant.value = variant
      state.delay.value = 0
      state.isRunning.value = false
      state.playground = undefined
    }

    function setState(playground: Playground) {
      const { state: playgroundState, delays, component, visualize, getState } = playground

      state.playground = {
        state: playgroundState,
        delays,
        component,
        getState
      }

      state.visualize = () => visualize(state.delay.value)
    }
  }
})()
