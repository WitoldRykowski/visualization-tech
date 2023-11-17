import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Animation/animation.service'
import { Array as createArray, type ArrayInstance } from '@/services/Sandbox/elements/Array'

let moves: Move[] = []
let values: number[] = []
let Array: ArrayInstance | undefined = undefined

const initMergeSort = () => {
  values = generateNonSortedArray()
  Array = createArray(values)
  moves = []

  initAnimation(animateMergeSort)
}

const visualizeMergeSort = () => {
  mergeSort(values)
}

function mergeSort(values: number[]): number[] {
  if (values.length <= 1) {
    return values
  }

  const middle = Math.floor(values.length / 2)
  const left = values.slice(0, middle)
  const right = values.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = []

  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

function animateMergeSort() {
  if (!Array) return

  const isChanged = Array.draw()

  if (isChanged || !moves.length) return
}

export const MergeSort: VariantSetup = {
  init: initMergeSort,
  visualize: visualizeMergeSort
}

type Move = {
  animation: MoveAnimation | 'move-left' | 'move-right'
  left: number
  right: number
  middle: number
}
