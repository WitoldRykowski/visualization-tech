import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { Heap, type HeapInstance } from '@/services/Sandbox/elements/Heap'

let moves: Move[] = []
let values: number[] = []
let heap: HeapInstance | undefined = undefined

const initHeapSort = () => {
  initAnimation(init, animateHeapSort)

  function init() {
    values = generateNonSortedArray(30)
    moves = []
  }

  heap = Heap(values)
}

const visualizeHeapSort = () => {
  heapSort()
}

function heapSort() {}

function animateHeapSort() {
  if (!heap) return

  const isChanged = heap.draw()

  if (isChanged || !moves.length) return
}

export const HeapSort: VariantSetup = {
  init: initHeapSort,
  visualize: visualizeHeapSort
}

export type Move = {}
