import { generateNonSortedArray } from './ArrayService/array.service'
import { renderArray } from '@/services/SandboxService/Creator'
import type { Column, MoveAnimation } from './SandboxService/elements/Column'
import { drawColumns, initAnimation } from './SandboxService/sandbox.service'
import type { VariantSetup } from '@/services/SandboxService/types'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

const initInsertionSort = () => {
  initAnimation(init, animateInsertionSort)

  function init() {
    values = generateNonSortedArray()
    columns = renderArray(values)
    moves = []
  }
}

const visualizeInsertionSort = () => {
  moves = insertionSort(values)
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

  return moves
}

function animateInsertionSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const { indexes, animation } = moves.shift()!
  const [i, j] = indexes

  if (animation === 'swap') {
    columns[i].jump()
    columns[j].jump()

    columns[i].moveTo(columns[j])
    columns[j].moveTo(columns[i], { yOffset: -1 })
    ;[columns[i], columns[j]] = [columns[j], columns[i]]
  }
}

export const InsertionSort: VariantSetup = {
  init: initInsertionSort,
  visualize: visualizeInsertionSort
}

export const __testing = () => ({
  getState: () => ({ moves, columns, values }),
  animateInsertionSort,
  initInsertionSort,
  visualizeInsertionSort
})

type Move = {
  indexes: [number, number]
  animation: MoveAnimation
}
