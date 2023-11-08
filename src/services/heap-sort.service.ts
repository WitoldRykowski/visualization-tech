import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { Heap, type HeapInstance } from '@/services/Sandbox/elements/Heap'

let moves: Move[] = []
let values: number[] = []
let heap: HeapInstance | undefined = undefined
const SAFE_ARRAY_SIZE = 30

const initHeapSort = () => {
  initAnimation(init, animateHeapSort)

  function init() {
    moves = []
    values = generateNonSortedArray(SAFE_ARRAY_SIZE).map((value) => {
      return Math.floor(value * 50)
    })
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
