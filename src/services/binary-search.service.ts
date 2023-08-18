import { generateSortedArray } from '@/utils'
import { type Component, defineAsyncComponent, reactive } from 'vue'
import { generatePlaygroundSettings } from '@/services/SandboxService/sandbox.service'
import type { PlaygroundSettings } from '@/services/SandboxService/types'

export interface BinarySearchPlayground {
  algorithmState: {
    values: number[]
    target: number
    min: number
    max: number
    guess: number
  }
  component: Component
  settings: PlaygroundSettings
}

export const getBinarySearchPlayground = (): BinarySearchPlayground => {
  const values = generateSortedArray()

  return {
    algorithmState: reactive({
      values,
      target: 0,
      min: 0,
      max: values.length - 1,
      guess: 0
    }),
    component: defineAsyncComponent(() => import('@/components/BinarySearch')),
    settings: generatePlaygroundSettings()
  }
}
