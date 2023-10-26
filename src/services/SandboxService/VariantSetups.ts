import { noop } from '@/utils'
import type { VariantName } from '@/services/SandboxService/sandbox.service'
import { initBubbleSort, visualizeBubbleSort } from '@/services/bubble-sort.service'
import { initBinarySearch, visualizeBinarySearch } from '@/services/binary-search.service'
import { initQuickSort, visualizeQuickSort } from '@/services/quick-sort.service'
import { initSelectionSort, visualizeSelectionSort } from '@/services/selection-sort.service'
import { initInsertionSort, visualizeInsertionSort } from '@/services/insertion-sort.service'
import { initGnomeSort, visualizeGnomeSort } from '@/services/gnome-sort.service'

const BubbleSort: VariantSetup = {
  init: initBubbleSort,
  visualize: visualizeBubbleSort
}

const QuickSort: VariantSetup = {
  init: initQuickSort,
  visualize: visualizeQuickSort
}

const BinarySearch: VariantSetup = {
  init: initBinarySearch,
  visualize: visualizeBinarySearch
}

const SelectionSort: VariantSetup = {
  init: initSelectionSort,
  visualize: visualizeSelectionSort
}

const InsertionSort: VariantSetup = {
  init: initInsertionSort,
  visualize: visualizeInsertionSort
}

const GnomeSort: VariantSetup = {
  init: initGnomeSort,
  visualize: visualizeGnomeSort
}

const Stack: VariantSetup = {
  init: noop,
  visualize: noop
}

const Queue: VariantSetup = {
  init: noop,
  visualize: noop
}

export const VariantSetups: Record<NonNullable<VariantName>, VariantSetup> = {
  BubbleSort,
  BinarySearch,
  GnomeSort,
  InsertionSort,
  SelectionSort,
  QuickSort,
  Queue,
  Stack
}

type VariantSetup = { init: () => void; visualize: () => void }
