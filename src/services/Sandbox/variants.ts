import type { VariantSetup } from './types'
import type { VariantName } from '@/services/Sandbox/sandbox.service'
import { BubbleSort } from '@/services/bubble-sort.service'
import { BinarySearch } from '@/services/binary-search.service'
import { QuickSort } from '@/services/quick-sort.service'
import { SelectionSort } from '@/services/selection-sort.service'
import { InsertionSort } from '@/services/insertion-sort.service'
import { GnomeSort } from '@/services/gnome-sort.service'
import { BFS as BreadthFirstSearch } from '@/services/bfs.service'
import { DFS as DepthFirstSearch } from '@/services/dfs.service'

export const Variants: Record<NonNullable<VariantName>, VariantSetup> = {
  BubbleSort,
  BinarySearch,
  GnomeSort,
  InsertionSort,
  SelectionSort,
  QuickSort,
  BreadthFirstSearch,
  DepthFirstSearch
}
