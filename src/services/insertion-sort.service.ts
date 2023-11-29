import { generateNonSortedArray } from '@/services/Array/array.service'
import { drawColumns, initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Sandbox/elements/Column'
import { Row } from '@/services/Sandbox/elements/Row'

let moves: Move[] = []
let values: number[] = []
const row = Row()

const initInsertionSort = () => {
  values = generateNonSortedArray()
  row.createColumns(values)
  moves = []

  initAnimation(animateInsertionSort)
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
  const isChanged = drawColumns(row.columns)

  if (isChanged || !moves.length) return

  const { indexes, animation } = moves.shift()!
  const [i, j] = indexes

  if (animation === 'swap') {
    row.columns[i].jump()
    row.columns[j].jump()

    row.swapColumns([i, j])
  }
}

export const InsertionSort: VariantSetup = {
  init: initInsertionSort,
  visualize: visualizeInsertionSort
}

export const __testing = () => ({
  getState: () => ({ moves, columns: row?.columns ?? [], values }),
  animateInsertionSort,
  initInsertionSort,
  visualizeInsertionSort
})

type Move = {
  indexes: [number, number]
  animation: MoveAnimation
}
