import { type BinarySearchPlayground } from '@/services/binary-search.service'
import { ALGORITHMS_LIST, DATA_STRUCTURES_LIST } from '@/services/SandboxService/sandbox.service'
import { type Ref } from 'vue'
import type { BubbleSortPlayground } from '@/services/bubble-sort.service'
import type { QuickSortPlayground } from '@/services/quick-sort.service'
import type { StackPlayground } from '@/services/stack.service'
import type { QueuePlayground } from '@/services/queue.service'

export type DataStructuresList = (typeof DATA_STRUCTURES_LIST)[number]
export type AlgorithmsList = (typeof ALGORITHMS_LIST)[number]

export type Variant = DataStructuresList | AlgorithmsList | undefined
export type Playground =
  | BinarySearchPlayground
  | BubbleSortPlayground
  | QuickSortPlayground
  | StackPlayground
  | QueuePlayground
  | undefined

export type Sandbox = {
  variant: Variant
  playground: Playground
}

export type PlaygroundGeneratorsKey = Exclude<DataStructuresList | AlgorithmsList, undefined>
export type PlaygroundGenerators = {
  [key in PlaygroundGeneratorsKey]: () => Playground
}

export type PlaygroundSettings = {
  delays: number[]
  currentDelay: Ref<number>
  isRunning: Ref<boolean>
}
