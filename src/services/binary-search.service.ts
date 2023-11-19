import { COLLAPSED_COLUMN_HEIGHT, DEFAULT_COLOR } from '@/services/Sandbox/elements/Column'
import { generateSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { RGBColors } from '@/utils'
import type { MoveAnimation } from '@/services/Sandbox/elements/Column'
import { Row } from '@/services/Sandbox/elements/Row'

let moves: Move[] = []
let values: number[] = []
const row = Row()

const initBinarySearch = () => {
  values = generateSortedArray()
  row.createColumns(values)
  moves = []

  initAnimation(animateBinarySearch)
}

const visualizeBinarySearch = () => {
  binarySearch(values)
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
}

const animateBinarySearch = () => {
  const isChanged = row.draw()

  if (isChanged || !moves.length) return

  const move = moves.shift()!
  const { guess, target, animation, min, max } = move

  if (animation === 'jump') {
    row.columns[guess].jump({ keepColor: true })

    if (values[guess] === target) {
      row.columns[guess].changeColor(RGBColors.positive)
    }
  } else if (animation === 'collapse') {
    for (let i = 0; i < min; i++) {
      if (row.columns[i].height > COLLAPSED_COLUMN_HEIGHT) {
        row.columns[i].collapse()
      }
    }

    for (let i = max + 1; i < row.columns.length; i++) {
      if (row.columns[i].height > COLLAPSED_COLUMN_HEIGHT) {
        row.columns[i].collapse()
      }
    }
  }

  if (values[guess] !== target) {
    row.columns[guess].changeColor(DEFAULT_COLOR)
  }
}

export const BinarySearch: VariantSetup = {
  init: initBinarySearch,
  visualize: visualizeBinarySearch
}

export const __testing = () => ({
  getState: () => ({ values, moves, columns: row?.columns ?? [] }),
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
