import type { Column, MoveAnimation } from '@/services/ArrayService/Column'
import { generateNonSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'
import { colors } from 'quasar'
import { getMoveToAnimationConfig } from '@/services/AnimationService/animation.service'

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
  const grey = colors.getPaletteColor('grey-1')
  const primary = colors.getPaletteColor('primary')
  const negative = colors.getPaletteColor('negative')

  if (animation.startsWith('changeColor')) {
    handleChangeColor()
  } else if (animation.startsWith('jump')) {
    handleJump()
  } else if (animation === 'swap') {
    handleSwap()
  }

  if (!moves.length) {
    for (let i = 0; i < columns.length; i++) {
      columns[i].changeColor(primary)
    }
  }

  function handleSwap() {
    if (i === j) return

    const config = getMoveToAnimationConfig({
      frameCount: 50
    })

    columns[i].moveTo(columns[j], config)
    columns[j].moveTo(columns[i], { ...config, yOffset: -1 })
    ;[columns[i], columns[j]] = [columns[j], columns[i]]

    columns[pivotIndex].changeColor(negative)
  }

  function handleJump() {
    const indexes = [i]

    if (animation.endsWith('j')) {
      indexes.push(j)
    }

    indexes.forEach((index) => {
      columns[index].jump()
    })
  }

  function handleChangeColor() {
    for (let i = 0; i < columns.length; i++) {
      const isInRange = i >= left && i <= right

      columns[i].changeColor(isInRange ? primary : grey)
    }

    columns[pivotIndex].changeColor(negative)
  }
}
