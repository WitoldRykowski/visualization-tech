import { generateNonSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Sandbox/elements/Column'
import { Row, type RowInstance } from '@/services/Sandbox/elements/Row'

let moves: Move[] = []
let values: number[] = []
let row: RowInstance | undefined = undefined

const initBubbleSort = () => {
  values = generateNonSortedArray()
  row = Row(values)
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
  if (!row) return

  const isChanged = row.draw()

  if (isChanged || !moves.length) return

  const {
    indexes: [i, j],
    animation
  } = moves.shift()!

  if (animation === 'swap') {
    row.columns[i].moveTo(row.columns[j])
    row.columns[j].moveTo(row.columns[i], { yOffset: -1 })
    ;[row.columns[i], row.columns[j]] = [row.columns[j], row.columns[i]]
  } else {
    row.columns[i].jump()
    row.columns[j].jump()
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
  getState: () => ({ values, columns: row?.columns ?? [], moves })
}

type Move = {
  indexes: [number, number]
  animation: MoveAnimation
}
