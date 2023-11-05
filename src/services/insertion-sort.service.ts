import { generateNonSortedArray } from '@/services/Array/array.service'
import { getColumns } from '@/services/Sandbox/Creator'
import type { Column } from '@/services/Sandbox/elements/Column'
import { drawColumns, initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Animation/animation.service'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

const initInsertionSort = () => {
  initAnimation(init, animateInsertionSort)

  function init() {
    values = generateNonSortedArray()
    columns = getColumns(values)
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
