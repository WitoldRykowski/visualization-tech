import { generateNonSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { RGBColors } from '@/utils'
import { DEFAULT_COLOR } from '@/services/Sandbox/elements/Column'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Sandbox/elements/Column'
import { Row } from '@/services/Sandbox/elements/Row'

let moves: Move[] = []
let values: number[] = []
const row = Row()

const initSelectionSort = () => {
  values = generateNonSortedArray()
  row.createColumns(values)
  moves = []

  initAnimation(animateSelectionSort)
}

const visualizeSelectionSort = () => {
  selectionSort(values)
}

function selectionSort(values: number[]) {
  for (let i = 0; i < values.length - 1; i++) {
    let minIndex = i

    moves.push({
      lastMinIndex: minIndex,
      minIndex,
      indexes: [i, -1],
      animation: 'changeColor'
    })

    for (let j = i + 1; j < values.length; j++) {
      moves.push({
        lastMinIndex: minIndex,
        minIndex,
        indexes: [i, j],
        animation: 'jump'
      })

      if (values[j] < values[minIndex]) {
        moves.push({
          lastMinIndex: minIndex,
          minIndex: j,
          indexes: [i, j],
          animation: 'changeColor'
        })

        minIndex = j
      }
    }

    moves.push({
      lastMinIndex: minIndex,
      minIndex,
      indexes: [i, -1],
      animation: 'swap'
    })
    ;[values[minIndex], values[i]] = [values[i], values[minIndex]]
  }
}

function animateSelectionSort() {
  const isChanged = row.draw()

  if (isChanged || !moves.length) return

  const { minIndex, lastMinIndex, animation, indexes } = moves.shift()!
  const [i, j] = indexes

  if (animation === 'swap' && minIndex !== i) {
    handleSwap()
  } else if (animation === 'changeColor') {
    handleChangeColor()
  } else if (j !== -1) {
    row.columns[j].jump()
  }

  function handleSwap() {
    if (!row) return

    const frameCount = 40

    row.columns[minIndex].jump()
    row.columns[i].jump()

    row.swapColumns([i, minIndex], { frameCount })
  }

  function handleChangeColor() {
    if (lastMinIndex !== minIndex) {
      if (lastMinIndex === i && j !== -1) {
        row.columns[i].changeColor(RGBColors.warning)
      } else {
        row.columns[lastMinIndex].changeColor(DEFAULT_COLOR)
      }
    }

    row.columns[minIndex].changeColor(RGBColors.info)
  }
}

export const SelectionSort: VariantSetup = {
  init: initSelectionSort,
  visualize: visualizeSelectionSort
}

export const __testing = () => ({
  getState: () => ({ values, columns: row?.columns ?? [], moves }),
  initSelectionSort,
  visualizeSelectionSort,
  animateSelectionSort
})

type Move = {
  minIndex: number
  lastMinIndex: number
  indexes: [number, number]
  animation: MoveAnimation
}
