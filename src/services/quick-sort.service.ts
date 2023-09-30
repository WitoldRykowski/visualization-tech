import type { Column, MoveAnimation } from '@/services/ArrayService/Column'
import { generateNonSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'

type Move = {
  left: number
  right: number
  pivotIndex: number
  indexes: [number, number]
  animation: MoveAnimation | 'move-back'
}

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initQuickSort = () => {
  values = generateNonSortedArray()
  columns = renderArray(values)
  moves = []

  stopAnimation()
  animate(animateQuickSort)
}

export const visualizeQuickSort = () => {
  moves = quickSort(values, 0, values.length - 1)
}

function quickSort(values: number[], left: number, right: number) {
  if (values.length > 1) {
    const index = partition(values, left, right)

    if (left < index - 1) quickSort(values, left, index - 1)

    if (index < right) quickSort(values, index, right)
  }

  return moves

  function partition(array: number[], left: number, right: number) {
    const middle = Math.floor((right + left) / 2)
    const pivot = array[middle]
    let i = left
    let j = right

    moves.push({
      pivotIndex: middle,
      left,
      right,
      animation: 'move',
      indexes: [i, j]
    })

    while (i <= j) {
      while (array[i] < pivot) i++

      while (array[j] > pivot) j--

      if (i <= j) {
        ;[array[i], array[j]] = [array[j], array[i]]

        moves.push({
          pivotIndex: middle,
          left,
          right,
          animation: 'swap',
          indexes: [i, j]
        })

        i++
        j--
      }
    }

    moves.push({
      pivotIndex: middle,
      left,
      right,
      animation: 'move-back',
      indexes: [i, j]
    })

    return i
  }
}

function animateQuickSort() {
  const isChanged = drawColumns(columns)

  if (!isChanged && moves.length > 0) {
    const { left, right, pivotIndex, animation, indexes } = moves.shift()!
    // TODO think about better visualization
    columns[pivotIndex].changeColor('red')

    if (animation === 'move') {
      for (let i = left; i <= right; i++) {
        columns[i].moveTo({ x: columns[i].x + 5, y: columns[i].y + 10 })
        // columns[i].changeColor('green')
      }
    } else if (animation === 'swap') {
      const [i, j] = indexes
      columns[i].moveTo(columns[j])
      columns[j].moveTo(columns[i], false, -1)
      ;[columns[i], columns[j]] = [columns[j], columns[i]]
    } else {
      for (let i = left; i <= right; i++) {
        columns[i].moveTo({ x: columns[i].x - 5, y: columns[i].y - 10 })
        // columns[i].changeColor(DEFAULT_COLUMN_COLOR)
      }
    }
  }
}
