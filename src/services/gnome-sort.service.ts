import { Column } from '@/services/ArrayService/Column'
import { generateNonSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initGnomeSort = () => {
  values = generateNonSortedArray()
  columns = renderArray(values)
  moves = []

  stopAnimation()
  animate(animateGnomeSort)
}

export const visualizeGnomeSort = () => {
  moves = gnomeSort(values)
}

function gnomeSort(values: number[]) {
  let index = 0

  while (index < values.length) {
    if (index == 0) index++

    if (values[index] >= values[index - 1]) {
      index++
    } else {
      ;[values[index], values[index - 1]] = [values[index - 1], values[index]]

      index--
    }
  }

  return moves
}

function animateGnomeSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return
}

type Move = {}
