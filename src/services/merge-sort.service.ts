import type { Column } from '@/services/Sandbox/elements/Column'
import { drawColumns, initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import { renderArray } from '@/services/Sandbox/Creator'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Animation/animation.service'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

const initMergeSort = () => {
  initAnimation(init, animateMergeSort)

  function init() {
    values = generateNonSortedArray()
    columns = renderArray(values)
    moves = []
  }
}

const visualizeMergeSort = () => {
  mergeSort(values)
}

function mergeSort(values: number[]): number[] {
  if (values.length <= 1) return values

  const middle = Math.floor(values.length / 2)
  const left = values.slice(0, middle)
  const right = values.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right: number[]): number[] {
  // console.log(left, right)
  const result: number[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      moves.push({
        animation: 'move-left',
        left: leftIndex,
        middle: -1,
        right: rightIndex
      })

      result.push(left[leftIndex])
      leftIndex++
    } else {
      moves.push({
        animation: 'move-right',
        left: leftIndex,
        middle: -1,
        right: rightIndex
      })

      result.push(right[rightIndex])
      rightIndex++
    }
  }

  console.log(result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)))
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

function animateMergeSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const { animation, left, right, middle } = moves.shift()!

  if (animation.includes('move')) {
    if (animation.endsWith('-left')) {
      columns[left].moveTo({ x: columns[left].x, y: columns[left].y - 50 })
    } else {
      columns[right].moveTo({ x: columns[right].x, y: columns[right].y - 50 })
    }
  }
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
