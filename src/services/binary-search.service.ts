import { Column, DEFAULT_COLOR, type MoveAnimation } from '@/services/ArrayService/Column'
import { generateSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'
import { convertNamedColorToRGB } from '@/utils'

export const BINARY_SEARCH_DELAYS = [15, 20, 30] as const

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []
let wasVisualize = false

export const initBinarySearch = () => {
  values = generateSortedArray()
  columns = renderArray(values)
  moves = []

  stopAnimation()
  animate(animateBinarySearch)
}

export const visualizeBinarySearch = () => {
  if (wasVisualize) {
    columns = renderArray(values)
  }

  wasVisualize = true
  moves = binarySearch(values)!
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

    let lastUpdatedValue: LastUpdatedValue = 'both'

    if (values[guess] > target) {
      max = guess - 1
      lastUpdatedValue = 'max'
    } else if (values[guess] < target) {
      min = guess + 1
      lastUpdatedValue = 'min'
    } else {
      min = max = guess

      moves.push({
        min,
        max,
        guess,
        target,
        animation: 'collapse',
        lastUpdatedValue: 'both'
      })
      break
    }

    moves.push({
      min,
      max,
      guess,
      target,
      animation: 'collapse',
      lastUpdatedValue
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
}

function triggerCollapse(move: CollapseMoveConfig) {
  const { lastUpdatedValue, min, target, max } = move
  const isMinLastUpdated = lastUpdatedValue === 'min' || lastUpdatedValue === 'both'
  const isMaxLastUpdated = lastUpdatedValue === 'max' || lastUpdatedValue === 'both'

  if (isMinLastUpdated) {
    for (let i = 0; i < min; i++) {
      if (values[i] !== target) {
        columns[i].collapse()
      }
    }
  }

  if (isMaxLastUpdated) {
    for (let i = max + 1; i < columns.length; i++) {
      if (values[i] !== target) {
        columns[i].collapse()
      }
    }
  }
}

type LastUpdatedValue = 'min' | 'max' | 'both'

type GeneralMoveConfig = {
  min: number
  max: number
  guess: number
  target: number
}

type CollapseMoveConfig = {
  animation: Extract<MoveAnimation, 'collapse'>
  lastUpdatedValue: LastUpdatedValue
} & GeneralMoveConfig

type JumpMoveConfig = {
  animation: Extract<MoveAnimation, 'jump'>
} & GeneralMoveConfig

type Move = CollapseMoveConfig | JumpMoveConfig
