import { noop } from '@/utils'
import type { Variant } from '@/services/SandboxService/sandbox.service'
import {
  initBubbleSort,
  visualizeBubbleSort,
  BUBBLE_SORT_DELAYS
} from '@/services/bubble-sort.service'
import {
  initBinarySearch,
  visualizeBinarySearch,
  BINARY_SEARCH_DELAYS
} from '@/services/binary-search.service'
import { initQuickSort, QUICK_SORT_DELAYS, visualizeQuickSort } from '@/services/quick-sort.service'
import {
  initSelectionSort,
  SELECTION_SORT_DELAYS,
  visualizeSelectionSort
} from '@/services/selection-sort.service'

const BubbleSort: VariantSetup = {
  actions: { init: initBubbleSort, visualize: visualizeBubbleSort },
  delays: BUBBLE_SORT_DELAYS
}

const QuickSort: VariantSetup = {
  actions: { init: initQuickSort, visualize: visualizeQuickSort },
  delays: QUICK_SORT_DELAYS
}

const BinarySearch: VariantSetup = {
  actions: { init: initBinarySearch, visualize: visualizeBinarySearch },
  delays: BINARY_SEARCH_DELAYS
}

const SelectionSort: VariantSetup = {
  actions: { init: initSelectionSort, visualize: visualizeSelectionSort },
  delays: SELECTION_SORT_DELAYS
}

const Stack: VariantSetup = {
  actions: { init: noop, visualize: noop },
  delays: []
}

const Queue: VariantSetup = {
  actions: { init: noop, visualize: noop },
  delays: []
}

export const VariantSetups: Record<NonNullable<Variant>, VariantSetup> = {
  BubbleSort,
  QuickSort,
  BinarySearch,
  SelectionSort,
  Queue,
  Stack
}

type BinarySearchActions = { init: () => void; visualize: (target: number) => void }

export type VariantActions = { init: () => void; visualize: () => void } | BinarySearchActions

type VariantSetup = {
  actions: VariantActions
  delays: Readonly<number[]>
}
