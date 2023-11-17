import { generateNonSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Animation/animation.service'
import { Array as createArray, type ArrayInstance } from '@/services/Sandbox/elements/Array'

let moves: Move[] = []
let values: number[] = []
let Array: ArrayInstance | undefined = undefined

const initBubbleSort = () => {
  values = generateNonSortedArray()
  Array = createArray(values)
  moves = []

  initAnimation(animateBubbleSort)
}

const visualizeBubbleSort = () => {
  bubbleSort(values)
}

function bubbleSort(values: number[]) {
  let isSwapped = false
  let sortedCount = 0

  do {
    isSwapped = false

    for (let i = 1; i < values.length - sortedCount; i++) {
      const previousIndex = i - 1

      if (values[previousIndex] > values[i]) {
        isSwapped = true
        ;[values[previousIndex], values[i]] = [values[i], values[previousIndex]]

        moves.push({
          indexes: [previousIndex, i],
          animation: 'swap'
        })
      } else {
        moves.push({
          indexes: [previousIndex, i],
          animation: 'jump'
        })
      }
    }

    sortedCount++
  } while (isSwapped)
}

function animateBubbleSort() {
  if (!Array) return

  const isChanged = Array.draw()

  if (isChanged || !moves.length) return

  const {
    indexes: [i, j],
    animation
  } = moves.shift()!

  if (animation === 'swap') {
    Array.columns[i].moveTo(Array.columns[j])
    Array.columns[j].moveTo(Array.columns[i], { yOffset: -1 })
    ;[Array.columns[i], Array.columns[j]] = [Array.columns[j], Array.columns[i]]
  } else {
    Array.columns[i].jump()
    Array.columns[j].jump()
  }
}

export const BubbleSort: VariantSetup = {
  init: initBubbleSort,
  visualize: visualizeBubbleSort
}

export const __testing = {
  animateBubbleSort,
  initBubbleSort,
  visualizeBubbleSort,
  getState: () => ({ values, columns: Array?.columns ?? [], moves })
}

type Move = {
  indexes: [number, number]
  animation: MoveAnimation
}
