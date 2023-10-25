import { Column, DEFAULT_COLOR, type MoveAnimation } from '@/services/ArrayService/Column'
import { generateNonSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'
import { convertNamedColorToRGB } from '@/utils'

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
  let isSwapped = false

  while (index < values.length) {
    if (index == 0) {
      moves.push({ animation: 'touch', left: index - 1, right: index })

      index++
    }

    if (values[index] >= values[index - 1]) {
      moves.push({ animation: 'touch', left: index - 1, right: index })
      index++
    } else {
      // TODO Add move to change color of the right only for first swap
      // moves.push({ animation: ''})
      isSwapped = true
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

  if (animation === 'touch') {
    const color = convertNamedColorToRGB('warning')
    if (left !== -1) {
      columns[left].changeColor(color, 10)
    }

    columns[right].changeColor(color, 10)
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
