import { Column, type MoveAnimation } from '@/services/ArrayService/Column'
import { generateSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, stopAnimation } from '@/services/SandboxService/sandbox.service'

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
  let isChanged = false

  for (let i = 0; i < columns.length; i++) {
    isChanged = columns[i].draw() || isChanged
  }

  if (!isChanged && moves.length > 0) {
    const move = moves.shift()!
    const { min, max, guess, target, animation } = move

    if (animation === 'jump') {
      columns[guess].jump()

      if (values[guess] == target) {
        columns[guess].moveTo({ x: columns[guess].x + 2, y: columns[guess].y + 20 })
      }
    } else if (animation === 'collapse') {
      const { lastUpdatedValue } = move
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
  }
}

type LastUpdatedValue = 'min' | 'max' | 'both'

type CollapseMoveConfig = {
  animation: Extract<MoveAnimation, 'collapse'>
  lastUpdatedValue: LastUpdatedValue
}

type GeneralMoveConfig = {
  animation: Extract<MoveAnimation, 'jump'>
}

type MoveConfig = CollapseMoveConfig | GeneralMoveConfig

type Move =
  | {
      min: number
      max: number
      guess: number
      target: number
    } & MoveConfig
