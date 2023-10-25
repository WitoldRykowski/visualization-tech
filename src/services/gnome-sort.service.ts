import { Column, type MoveAnimation } from '@/services/ArrayService/Column'
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
    if (index == 0) {
      moves.push({ animation: 'jump', left: index - 1, right: index })

      index++
    }

    if (values[index] >= values[index - 1]) {
      moves.push({ animation: 'jump', left: index - 1, right: index })
      index++
    } else {
      ;[values[index], values[index - 1]] = [values[index - 1], values[index]]
      moves.push({ animation: 'swap', left: index - 1, right: index })
      index--
    }
  }

  return moves
}

function animateGnomeSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const { animation, left, right } = moves.shift()!

  if (animation === 'jump') {
    if (left !== -1) {
      columns[left].jump()
    }

    columns[right].jump()
  } else {
    columns[left].moveTo(columns[right])
    columns[right].moveTo(columns[left], { yOffset: -1 })
    ;[columns[left], columns[right]] = [columns[right], columns[left]]
  }
}

type Move = {
  animation: MoveAnimation
  left: number
  right: number
}
