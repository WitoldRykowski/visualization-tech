import { generateNonSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { RGBColors } from '@/utils'
import { DEFAULT_COLOR } from '@/services/Sandbox/elements/Column'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Animation/animation.service'
import { Array as createArray, type ArrayInstance } from '@/services/Sandbox/elements/Array'

let moves: Move[] = []
let values: number[] = []
let Array: ArrayInstance | undefined = undefined

const initSelectionSort = () => {
  initAnimation(init, animateSelectionSort)

  function init() {
    values = generateNonSortedArray()
    Array = createArray(values)
    moves = []
  }
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
  if (!Array) return

  const isChanged = Array.draw()

  if (isChanged || !moves.length) return

  const { minIndex, lastMinIndex, animation, indexes } = moves.shift()!
  const [i, j] = indexes

  if (animation === 'swap' && minIndex !== i) {
    handleSwap()
  } else if (animation === 'changeColor') {
    handleChangeColor()
  } else if (j !== -1) {
    Array.columns[j].jump()
  }

  function handleSwap() {
    if (!Array) return

    const frameCount = 40

    Array.columns[minIndex].jump()
    Array.columns[i].jump()

    Array.columns[minIndex].moveTo(Array.columns[i], { frameCount })
    Array.columns[i].moveTo(Array.columns[minIndex], { yOffset: -1, frameCount })
    ;[Array.columns[minIndex], Array.columns[i]] = [Array.columns[i], Array.columns[minIndex]]
  }

  function handleChangeColor() {
    if (!Array) return

    if (lastMinIndex !== minIndex) {
      if (lastMinIndex === i && j !== -1) {
        Array.columns[i].changeColor(RGBColors.warning)
      } else {
        Array.columns[lastMinIndex].changeColor(DEFAULT_COLOR)
      }
    }

    Array.columns[minIndex].changeColor(RGBColors.info)
  }
}

export const SelectionSort: VariantSetup = {
  init: initSelectionSort,
  visualize: visualizeSelectionSort
}

export const __testing = () => ({
  getState: () => ({ values, columns: Array?.columns ?? [], moves }),
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
