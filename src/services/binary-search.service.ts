import {
  COLLAPSED_COLUMN_HEIGHT,
  Column,
  DEFAULT_COLOR,
  type MoveAnimation
} from '@/services/ArrayService/Column'
import { generateSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'
import { convertNamedColorToRGB } from '@/utils'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initBinarySearch = () => {
  values = generateSortedArray()
  columns = renderArray(values)
  moves = []

  stopAnimation()
  animate(animateBinarySearch)
}

export const visualizeBinarySearch = () => {
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
  const { guess, target, animation } = move

  if (animation === 'jump') {
    columns[guess].jump({ keepColor: true })

    if (values[guess] === target) {
      columns[guess].changeColor(convertNamedColorToRGB('positive'))
    }
  } else if (animation === 'collapse') {
    triggerCollapse(move)

    if (values[guess] !== target) {
      columns[guess].changeColor(DEFAULT_COLOR)
    }
  }

  function triggerCollapse(move: Move) {
    const COLLAPSE_DELAY = 15
    const { min, max } = move

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
}

export const __testing = () => ({
  values,
  moves,
  columns,
  animateBinarySearch
})

type Move = {
  min: number
  max: number
  guess: number
  target: number
  animation: MoveAnimation
}
