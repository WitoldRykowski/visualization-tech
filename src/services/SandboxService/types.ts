import { type BinarySearchPlayground } from '@/services/binary-search.service'
import { ALGORITHMS_LIST, DATA_STRUCTURES_LIST } from '@/services/SandboxService/sandbox.service'
import { type Component, type Ref } from 'vue'
import type { BubbleSortPlayground } from '@/services/bubble-sort.service'
import type { QuickSortPlayground } from '@/services/quick-sort.service'
import type { StackPlayground } from '@/services/stack.service'
import type { QueuePlayground } from '@/services/queue.service'

export type DataStructuresList = (typeof DATA_STRUCTURES_LIST)[number]
export type AlgorithmsList = (typeof ALGORITHMS_LIST)[number]

export type Variant = DataStructuresList | AlgorithmsList | undefined

export type BasePlayground<T, K> = {
  state: T
  delays: K
  component: Component
  visualize: (delay: number) => void
  getState: () => T
}

type FinalPlayground<T> = Omit<T, 'visualize'>

export type Playground =
  | BinarySearchPlayground
  | BubbleSortPlayground
  | QuickSortPlayground
  | StackPlayground
  | QueuePlayground

export type Sandbox = {
  variant: Ref<Variant>
  delay: Ref<number>
  isRunning: Ref<boolean>
  playground: FinalPlayground<Playground> | undefined
  visualize: () => void
}

export type PlaygroundGeneratorsKey = Exclude<DataStructuresList | AlgorithmsList, undefined>
export type PlaygroundGenerators = {
  [key in PlaygroundGeneratorsKey]: () => Playground
}
