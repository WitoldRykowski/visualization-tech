import type { Column, MoveAnimation } from '@/services/ArrayService/Column'
import { generateNonSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'
import { convertNamedColorToRGB } from '@/utils'

type Move = {
  left: number
  right: number
  pivotIndex: number
  indexes: [number, number]
  animation: MoveAnimation | `jump-${string}`
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

    const basicPayload = {
      pivotIndex: middle,
      left,
      right
    }

    moves.push({
      ...basicPayload,
      animation: `changeColor`,
      indexes: [i, j]
    })

    while (i <= j) {
      while (array[i] < pivot) {
        i++

        moves.push({
          ...basicPayload,
          animation: `jump-i`,
          indexes: [i, j]
        })
      }

      while (array[j] > pivot) {
        j--

        moves.push({
          ...basicPayload,
          animation: `jump-j`,
          indexes: [i, j]
        })
      }

      if (i <= j) {
        ;[array[i], array[j]] = [array[j], array[i]]

        moves.push({
          ...basicPayload,
          animation: 'swap',
          indexes: [i, j]
        })

        i++
        j--
      }
    }

    return i
  }
}

function animateQuickSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const { left, right, pivotIndex, animation, indexes } = moves.shift()!
  const [i, j] = indexes
  const grey = convertNamedColorToRGB('grey-1')
  const primary = convertNamedColorToRGB('primary')
  const negative = convertNamedColorToRGB('negative')

  if (animation.startsWith('changeColor')) {
    changeColumnColor()
  } else if (animation.startsWith('jump')) {
    jump()
  } else if (animation === 'swap') {
    swapColumns()
  }

  if (!moves.length) {
    for (let i = 0; i < columns.length; i++) {
      columns[i].changeColor(primary)
    }
  }

  function swapColumns() {
    if (i === j) return

    const config = {
      frameCount: 50
    }

    columns[i].moveTo(columns[j], config)
    columns[j].moveTo(columns[i], { ...config, yOffset: -1 })
    ;[columns[i], columns[j]] = [columns[j], columns[i]]

    columns[pivotIndex].changeColor(negative)
  }

  function jump() {
    const indexes = [i]

    if (animation.endsWith('j')) {
      indexes.push(j)
    }

    indexes.forEach((index) => {
      columns[index].jump()
    })
  }

  function changeColumnColor() {
    for (let i = 0; i < columns.length; i++) {
      const isInRange = i >= left && i <= right
      const color = isInRange ? primary : grey

      columns[i].changeColor(color)
    }

    if (moves.length) {
      columns[pivotIndex].changeColor(negative)
    }
  }
}
