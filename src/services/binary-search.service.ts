import { generateSortedArray } from '@/utils'
import { reactive } from 'vue'
import { BinarySearch } from '@/components'
import type { BasePlayground } from '@/services/SandboxService/types'

interface BinarySearchState {
  values: number[]
  target: number
  min: number
  max: number
  guess: number
}

export type BinarySearchPlayground = BasePlayground<BinarySearchState, [200, 500, 1000]>

export const getBinarySearchPlayground = (): BinarySearchPlayground => {
  const values = generateSortedArray()

  const state = reactive<BinarySearchState>({
    values,
    target: 0,
    min: 0,
    max: values.length - 1,
    guess: 0
  })

  return { state, delays: [200, 500, 1000], component: BinarySearch, visualize }

  function visualize(delay: number) {
    console.log(delay) // TODO for visualize delay
    while (state.max >= state.min) {
      state.guess = Math.floor((state.max + state.min) / 2)

      if (values[state.guess] > state.target) {
        state.max = state.guess - 1
      } else if (values[state.guess] < state.target) {
        state.min = state.guess + 1
      } else {
        state.min = state.max = state.guess
        return
      }
    }
  }
}
