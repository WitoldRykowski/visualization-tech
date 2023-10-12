import { initBubbleSort, visualizeBubbleSort } from '@/services/bubble-sort.service'
import { noop } from '@/utils'
import type { Variant } from '@/services/SandboxService/sandbox.service'
import { initBinarySearch, visualizeBinarySearch } from '@/services/binary-search.service'
import { initQuickSort, visualizeQuickSort } from '@/services/quick-sort.service'

const BubbleSortSetup = {
  actions: { init: initBubbleSort, visualize: visualizeBubbleSort },
  delays: generateDelays()
}

const QuickSortSetup = {
  actions: { init: initQuickSort, visualize: visualizeQuickSort },
  delays: generateDelays()
}

const BinarySearchSetup = {
  actions: { init: initBinarySearch, visualize: visualizeBinarySearch },
  delays: generateDelays({ 0: 15, 1: 25, 2: 35 })
}

const StackSetup = {
  actions: { init: noop, visualize: noop },
  delays: generateDelays()
}

const QueueSetup = {
  actions: { init: noop, visualize: noop },
  delays: generateDelays()
}

export const VariantSetups: Record<NonNullable<Variant>, VariantSetup> = {
  BubbleSort: BubbleSortSetup,
  QuickSort: QuickSortSetup,
  BinarySearch: BinarySearchSetup,
  Queue: QueueSetup,
  Stack: StackSetup
}

function generateDelays(payload?: Partial<DelaysPayload>) {
  const defaultDelays = [5, 10, 20]

  if (!payload) return defaultDelays

  type Key = keyof DelaysPayload
  const keys = Object.keys(payload)

  keys.forEach((key) => {
    const index = Number(key)

    defaultDelays[index] = payload[key as unknown as Key]!
  })

  return defaultDelays
}

type DelaysPayload = {
  0: number
  1: number
  2: number
}

type BinarySearchActions = { init: () => void; visualize: (target: number) => void }

export type VariantActions = { init: () => void; visualize: () => void } | BinarySearchActions

type VariantSetup = {
  actions: VariantActions
  delays: number[]
}
