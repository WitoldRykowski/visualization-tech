import { initBubbleSort, visualizeBubbleSort } from '@/services/bubble-sort.service'
import { noop } from '@/utils'
import type { Variant } from '@/services/SandboxService/sandbox.service'
import { initBinarySearch, visualizeBinarySearch } from '@/services/binary-search.service'

const BubbleSortSetup = {
  actions: { init: initBubbleSort, visualize: visualizeBubbleSort },
  delays: [10, 20, 50]
}

const QuickSortSetup = {
  actions: { init: noop, visualize: noop },
  delays: [10, 20, 50]
}

const BinarySearchSetup = {
  actions: { init: initBinarySearch, visualize: visualizeBinarySearch },
  delays: [30, 50, 100]
}

const StackSetup = {
  actions: { init: noop, visualize: noop },
  delays: [10, 20, 50]
}

const QueueSetup = {
  actions: { init: noop, visualize: noop },
  delays: [10, 20, 50]
}

export const VariantSetups: Record<NonNullable<Variant>, VariantSetup> = {
  BubbleSort: BubbleSortSetup,
  QuickSort: QuickSortSetup,
  BinarySearch: BinarySearchSetup,
  Queue: QueueSetup,
  Stack: StackSetup
}

type BinarySearchActions = { init: () => void; visualize: (target: number) => void }

export type VariantActions = { init: () => void; visualize: () => void } | BinarySearchActions

type VariantSetup = {
  actions: VariantActions
  delays: number[]
}
