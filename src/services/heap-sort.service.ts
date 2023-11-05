import type { Column } from '@/services/Sandbox/elements/Column'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import { getColumns, getHeapStructure } from '@/services/Sandbox/Creator'
import type { VariantSetup } from '@/services/Sandbox/types'
import { Graph as createGraph, type Graph } from '@/services/Sandbox/elements/Graph'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []
let graph: Graph | undefined = undefined

const initHeapSort = () => {
  initAnimation(init, animateHeapSort)

  function init() {
    values = generateNonSortedArray()
    columns = getColumns(values)
    moves = []
  }

  const points = getHeapStructure([4, 2, 6, 1, 6, 7, 1, 9, 0, 2])

  graph = createGraph(points, [])
}

const visualizeHeapSort = () => {
  heapSort()
}

function heapSort() {}

function animateHeapSort() {
  if (!graph) return

  const isChanged = graph.draw()

  if (isChanged || !moves.length) return
}

export const HeapSort: VariantSetup = {
  init: initHeapSort,
  visualize: visualizeHeapSort
}

export type Move = {}
