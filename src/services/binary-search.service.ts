import { Column, type MoveAnimation } from '@/services/ArrayService/Column'
import { generateSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'
import { getMoveToAnimationConfig } from '@/services/AnimationService/animation.service'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []
let wasVisualize = false

export const initBinarySearch = () => {
  values = generateSortedArray()
  columns = renderArray(values, 8)
  moves = []

  stopAnimation()
  animate(animateBinarySearch)
}

export const visualizeBinarySearch = () => {
  if (wasVisualize) {
    columns = renderArray(values, 8)
  }

  wasVisualize = true
  moves = binarySearch(values)!
}

const binarySearch = (values: number[]) => {
  let guess = 0
  let min = 0
  let max = values.length - 1
  const target = Math.floor(Math.random() * values.length)

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
    columns[guess].jump()

    if (values[guess] == target) {
      const location = { x: columns[guess].x + 2, y: columns[guess].y + 20 }

      columns[guess].moveTo(location, getMoveToAnimationConfig({ keepColor: true }))
    }
  } else if (animation === 'collapse') {
    triggerCollapse(move)
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
