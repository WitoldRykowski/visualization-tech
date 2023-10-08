import { generateNonSortedArray, renderArray } from './ArrayService/array.service'
import type { Column, MoveAnimation } from '@/services/ArrayService/Column'
import { animate, drawColumns, stopAnimation } from './SandboxService/sandbox.service'
import { getMoveToAnimationConfig } from '@/services/AnimationService/animation.service'

type Move = {
  indexes: [number, number]
  animation: MoveAnimation
}

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initBubbleSort = () => {
  values = generateNonSortedArray()
  columns = renderArray(values)
  moves = []

  stopAnimation()
  animate(animateBubbleSort)
}

export const visualizeBubbleSort = () => {
  moves = bubbleSort(values)
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

  return moves
}

function animateBubbleSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const move = moves.shift()!

  const [i, j] = move.indexes

  if (move.animation === 'swap') {
    columns[i].moveTo(columns[j])
    columns[j].moveTo(columns[i], getMoveToAnimationConfig({ yOffset: -1 }))
    ;[columns[i], columns[j]] = [columns[j], columns[i]]
  } else {
    columns[i].jump()
    columns[j].jump()
  }
}
