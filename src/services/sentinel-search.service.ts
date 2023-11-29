import { COLUMN_HEIGHT_MULTIPLIER, Row } from '@/services/Sandbox/elements/Row'
import { generateSortedArray } from '@/services/Array/array.service'
import { getSandboxSize, initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { getRandomIndexGreaterThan, RGBColors } from '@/utils'
import type { MoveAnimation } from '@/services/Sandbox/elements/Column'

let moves: Move[] = []
let values: number[] = []
const row = Row()

const initSentinelSearch = () => {
  values = generateSortedArray()
  row.createColumns(values)
  moves = []

  initAnimation(animateSentinelSearch)
}

const visualizeSentinelSearch = () => {
  const index = getRandomIndexGreaterThan(4, values.length - 1)
  const target = values[index]
  sentinelSearch(target)
}

const sentinelSearch = (target: number) => {
  const last = values[values.length - 1]

  values[values.length - 1] = target

  moves.push({
    animation: 'replace-last',
    target
  })

  let i = 0

  while (values[i] !== target) {
    moves.push({
      animation: 'jump',
      i
    })

    i++
  }

  values[values.length - 1] = last

  const wasFound = i < values.length - 1 || last == target
  const result = wasFound ? i : -1

  moves.push({
    animation: 'changeColor',
    i: result
  })

  moves.push({
    animation: 'restore',
    target
  })
}

const animateSentinelSearch = () => {
  const isChanged = row.draw()

  if (isChanged || !moves.length) return

  const move = moves.shift()!
  const { height } = getSandboxSize()
  const lastIndex = row.columns.length - 1

  if (move.animation === 'jump') {
    row.columns[move.i].jump()
  } else if (move.animation === 'changeColor') {
    row.columns[move.i].changeColor(RGBColors.info)
  } else if (move.animation === 'replace-last') {
    row.columns[lastIndex].changeColor(RGBColors.grey)
    row.columns[lastIndex].changeHeight(height * move.target * COLUMN_HEIGHT_MULTIPLIER)
  } else if (move.animation === 'restore') {
    row.columns[lastIndex].changeHeight(height * values[lastIndex] * COLUMN_HEIGHT_MULTIPLIER)
    row.columns[lastIndex].changeColor(RGBColors.primary)
  }
}

export const SentinelSearch: VariantSetup = {
  init: initSentinelSearch,
  visualize: visualizeSentinelSearch
}

export const __testing = {
  getState: () => ({ values, moves, columns: row?.columns ?? [] }),
  animateSentinelSearch,
  visualizeSentinelSearch,
  initSentinelSearch
}

type Move =
  | {
      animation: MoveAnimation
      i: number
    }
  | ReplaceLastMove

type ReplaceLastMove = {
  animation: 'replace-last' | 'restore'
  target: number
}
