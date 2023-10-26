import { Column, DEFAULT_COLOR, type MoveAnimation } from '@/services/ArrayService/Column'
import { generateNonSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { drawColumns, initAnimation } from './/SandboxService/sandbox.service'
import { convertNamedColorToRGB } from '@/utils'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initGnomeSort = () => {
  initAnimation(init, animateGnomeSort)

  function init() {
    values = generateNonSortedArray()
    columns = renderArray(values)
    moves = []
  }
}

export const visualizeGnomeSort = () => {
  moves = gnomeSort(values)
}

function gnomeSort(values: number[]) {
  let index = 0
  let isSwapped = false

  while (index < values.length) {
    if (index == 0) {
      moves.push({ animation: 'touch', left: index - 1, right: index })

      index++
    }

    if (values[index] >= values[index - 1]) {
      isSwapped = false
      moves.push({ animation: 'touch', left: index - 1, right: index })
      index++
    } else {
      if (!isSwapped) {
        moves.push({ animation: 'jump', left: index - 1, right: index })
        isSwapped = true
      }

      ;[values[index], values[index - 1]] = [values[index - 1], values[index]]
      moves.push({ animation: 'swap', left: index - 1, right: index })
      index--
    }
  }

  moves.push({ animation: 'finish', left: -1, right: -1 })

  return moves
}

function animateGnomeSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const { animation, left, right } = moves.shift()!

  if (animation === 'touch') {
    const color = convertNamedColorToRGB('light-blue-5')
    if (left !== -1) {
      columns[left].changeColor(color)
    }

    columns[right].changeColor(color)
  } else if (animation === 'swap') {
    columns[left].moveTo(columns[right])
    columns[right].moveTo(columns[left], { yOffset: -1 })
    ;[columns[left], columns[right]] = [columns[right], columns[left]]
  } else if (animation === 'jump') {
    columns[right].jump()
  } else {
    for (let i = columns.length - 1; i >= 0; i--) {
      columns[i].changeColor(DEFAULT_COLOR)
    }
  }
}

type Move = {
  animation: MoveAnimation | 'finish'
  left: number
  right: number
}
