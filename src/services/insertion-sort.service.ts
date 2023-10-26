import { generateNonSortedArray, renderArray } from './ArrayService/array.service'
import type { Column, MoveAnimation } from './ArrayService/Column'
import { drawColumns, initAnimation } from './SandboxService/sandbox.service'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initInsertionSort = () => {
  initAnimation(init, animateInsertionSort)

  function init() {
    values = generateNonSortedArray()
    columns = renderArray(values)
    moves = []
  }
}

export const visualizeInsertionSort = () => {
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

export const __testing = () => ({
  moves,
  columns,
  values,
  animateInsertionSort
})

type Move = {
  indexes: [number, number]
  animation: MoveAnimation
}
