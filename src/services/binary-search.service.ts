import {
  COLLAPSED_COLUMN_HEIGHT,
  Column,
  DEFAULT_COLOR,
  type MoveAnimation
} from '@/services/ArrayService/Column'
import { generateSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { drawColumns, initAnimation } from '@/services/SandboxService/sandbox.service'
import { convertNamedColorToRGB } from '@/utils'
import type { VariantSetup } from '@/services/SandboxService/types'

export const COLLAPSE_DELAY = 15

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

const initBinarySearch = () => {
  initAnimation(init, animateBinarySearch)

  function init() {
    values = generateSortedArray()
    columns = renderArray(values)
    moves = []
  }
}

const visualizeBinarySearch = () => {
  columns = renderArray(values)

  moves = binarySearch(values)
}

const binarySearch = (values: number[]) => {
  let guess = 0
  let min = 0
  let max = values.length - 1
  const targetIndex = Math.floor(Math.random() * values.length)
  const target = values[targetIndex]

  while (max >= min) {
    guess = Math.floor((max + min) / 2)

    moves.push({
      min,
      max,
      guess,
      target,
      animation: 'jump'
    })

    if (values[guess] > target) {
      max = guess - 1
    } else if (values[guess] < target) {
      min = guess + 1
    } else {
      min = max = guess

      moves.push({
        min,
        max,
        guess,
        target,
        animation: 'collapse'
      })
      break
    }

    moves.push({
      min,
      max,
      guess,
      target,
      animation: 'collapse'
    })
  }

  return moves
}

const animateBinarySearch = () => {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const move = moves.shift()!
  const { guess, target, animation, min, max } = move

  if (animation === 'jump') {
    columns[guess].jump({ keepColor: true })

    if (values[guess] === target) {
      columns[guess].changeColor(convertNamedColorToRGB('positive'))
    }
  } else if (animation === 'collapse') {
    for (let i = 0; i < min; i++) {
      if (columns[i].height > COLLAPSED_COLUMN_HEIGHT) {
        columns[i].collapse({ frameCount: COLLAPSE_DELAY })
      }
    }

    for (let i = max + 1; i < columns.length; i++) {
      if (columns[i].height > COLLAPSED_COLUMN_HEIGHT) {
        columns[i].collapse({ frameCount: COLLAPSE_DELAY })
      }
    }
  }

  if (values[guess] !== target) {
    columns[guess].changeColor(DEFAULT_COLOR)
  }
}

export const BinarySearch: VariantSetup = {
  init: initBinarySearch,
  visualize: visualizeBinarySearch
}

export const __testing = () => ({
  values,
  moves,
  columns,
  animateBinarySearch,
  visualizeBinarySearch,
  initBinarySearch
})

type Move = {
  min: number
  max: number
  guess: number
  target: number
  animation: MoveAnimation
}
