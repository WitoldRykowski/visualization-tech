import { generateNonSortedArray } from '@/services/Array/array.service'
import { drawColumns, initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Animation/animation.service'
import { Array as createArray, type ArrayInstance } from '@/services/Sandbox/elements/Array'

let moves: Move[] = []
let values: number[] = []
let Array: ArrayInstance | undefined = undefined

const initInsertionSort = () => {
  initAnimation(init, animateInsertionSort)

  function init() {
    values = generateNonSortedArray()
    Array = createArray(values)
    moves = []
  }
}

const visualizeInsertionSort = () => {
  insertionSort(values)
}

function insertionSort(values: number[]) {
  for (let i = 0; i < values.length; i++) {
    const key = values[i]
    let j = i - 1

    while (j >= 0 && values[j] > key) {
      moves.push({
        indexes: [j + 1, j],
        animation: 'swap'
      })

      values[j + 1] = values[j]
      j = j - 1
    }

    values[j + 1] = key
  }
}

function animateInsertionSort() {
  if (!Array) return
  const isChanged = drawColumns(Array.columns)

  if (isChanged || !moves.length) return

  const { indexes, animation } = moves.shift()!
  const [i, j] = indexes

  if (animation === 'swap') {
    Array.columns[i].jump()
    Array.columns[j].jump()

    Array.columns[i].moveTo(Array.columns[j])
    Array.columns[j].moveTo(Array.columns[i], { yOffset: -1 })
    ;[Array.columns[i], Array.columns[j]] = [Array.columns[j], Array.columns[i]]
  }
}

export const InsertionSort: VariantSetup = {
  init: initInsertionSort,
  visualize: visualizeInsertionSort
}

export const __testing = () => ({
  getState: () => ({ moves, columns: Array?.columns ?? [], values }),
  animateInsertionSort,
  initInsertionSort,
  visualizeInsertionSort
})

type Move = {
  indexes: [number, number]
  animation: MoveAnimation
}
