import type { Column } from '@/services/Sandbox/elements/Column'
import { generateNonSortedArray } from '@/services/Array/array.service'
import { getColumns } from '@/services/Sandbox/Creator'
import { drawColumns, initAnimation } from '@/services/Sandbox/sandbox.service'
import type { ColorRGBA } from '@/types'
import type { VariantSetup } from '@/services/Sandbox/types'
import { RGBColors } from '@/utils'
import type { MoveAnimation } from '@/services/Animation/animation.service'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

const initQuickSort = () => {
  initAnimation(init, animateQuickSort)

  function init() {
    values = generateNonSortedArray()
    columns = getColumns(values)
    moves = []
  }
}

const visualizeQuickSort = () => {
  quickSort(values, 0, values.length - 1)
}

function quickSort(values: number[], left: number, right: number) {
  if (values.length > 1) {
    const index = partition(values, left, right)

    if (left < index - 1) quickSort(values, left, index - 1)

    if (index < right) quickSort(values, index, right)
  }

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
          animation: `touch-i`,
          indexes: [i, j]
        })
      }

      while (array[j] > pivot) {
        j--

        moves.push({
          ...basicPayload,
          animation: `touch-j`,
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

  if (animation.startsWith('changeColor')) {
    changeColumnColor()
  } else if (animation.startsWith('touch')) {
    touch()
  } else if (animation === 'swap') {
    swapColumns()
  }

  if (!moves.length) {
    for (let i = 0; i < columns.length; i++) {
      columns[i].changeColor(RGBColors.primary)
    }
  }

  function swapColumns() {
    if (i === j) return

    const config = {
      frameCount: 40
    }

    columns[i].jump()
    columns[j].jump()

    columns[i].moveTo(columns[j], config)
    columns[j].moveTo(columns[i], { ...config, yOffset: -1 })
    ;[columns[i], columns[j]] = [columns[j], columns[i]]

    if (i === pivotIndex || j === pivotIndex) {
      columns[pivotIndex].changeColor(RGBColors.negative)
    }
  }

  function touch() {
    changeColor(columns[i], RGBColors.warning)

    if (i > 0) {
      changeColor(columns[i - 1], RGBColors.primary)
    }

    if (!animation.endsWith('j')) return

    changeColor(columns[j], RGBColors.warning)

    if (j < values.length - 1) {
      changeColor(columns[j + 1], RGBColors.primary)
    }

    function changeColor(column: Column, RGBColor: ColorRGBA) {
      column.changeColor(RGBColor, 10)
    }
  }

  function changeColumnColor() {
    for (let i = 0; i < columns.length; i++) {
      const isInRange = i >= left && i <= right
      const color = isInRange ? RGBColors.primary : RGBColors.grey

      columns[i].changeColor(color)
    }

    if (moves.length) {
      columns[pivotIndex].changeColor(RGBColors.info)
    }
  }
}

export const QuickSort: VariantSetup = {
  init: initQuickSort,
  visualize: visualizeQuickSort
}

type Move = {
  left: number
  right: number
  pivotIndex: number
  indexes: [number, number]
  animation: MoveAnimation | `touch-${string}`
}
