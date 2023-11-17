import { DEFAULT_COLOR } from '@/services/Sandbox/elements/Column'
import { generateNonSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { RGBColors } from '@/utils'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Animation/animation.service'
import { Array as createArray, type ArrayInstance } from '@/services/Sandbox/elements/Array'

let moves: Move[] = []
let values: number[] = []
let Array: ArrayInstance | undefined = undefined

const initGnomeSort = () => {
  values = generateNonSortedArray()
  Array = createArray(values)
  moves = []

  initAnimation(animateGnomeSort)
}

const visualizeGnomeSort = () => {
  gnomeSort(values)
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
      isSwapped = false
      moves.push({ animation: 'touch', left: index - 1, right: index })
      index++
    } else {
      if (!isSwapped) {
        moves.push({ animation: 'jump', left: index - 1, right: index })
        isSwapped = true
      }

      ;[values[index], values[index - 1]] = [values[index - 1], values[index]]
      moves.push({ animation: 'swap', left: index - 1, right: index })
      index--
    }
  }

  moves.push({ animation: 'finish', left: -1, right: -1 })
}

function animateGnomeSort() {
  if (!Array) return

  const isChanged = Array.draw()

  if (isChanged || !moves.length) return

  const { animation, left, right } = moves.shift()!

  if (animation === 'touch') {
    const color = RGBColors.lightBlue
    if (left !== -1) {
      Array.columns[left].changeColor(color)
    }

    Array.columns[right].changeColor(color)
  } else if (animation === 'swap') {
    Array.columns[left].moveTo(Array.columns[right])
    Array.columns[right].moveTo(Array.columns[left], { yOffset: -1 })
    ;[Array.columns[left], Array.columns[right]] = [Array.columns[right], Array.columns[left]]
  } else if (animation === 'jump') {
    Array.columns[right].jump()
  } else {
    for (let i = Array.columns.length - 1; i >= 0; i--) {
      Array.columns[i].changeColor(DEFAULT_COLOR)
    }
  }
}

export const GnomeSort: VariantSetup = {
  init: initGnomeSort,
  visualize: visualizeGnomeSort
}

export const __testing = () => ({
  animateGnomeSort,
  initGnomeSort,
  visualizeGnomeSort,
  getState: () => ({ moves, values, columns: Array?.columns ?? [] })
})

type Move = {
  animation: MoveAnimation | 'finish'
  left: number
  right: number
}
