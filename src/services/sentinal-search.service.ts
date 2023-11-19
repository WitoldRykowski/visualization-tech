import { Row } from '@/services/Sandbox/elements/Row'
import { generateSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { getRandomValueFromGivenArray, RGBColors } from '@/utils'
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
  sentinelSearch(getRandomValueFromGivenArray(values))
}

const sentinelSearch = (target: number) => {
  const last = values[values.length - 1]

  values[values.length - 1] = target

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
}

const animateSentinelSearch = () => {
  const isChanged = row.draw()

  if (isChanged || !moves.length) return

  const { animation, i } = moves.shift()!

  if (animation === 'jump') {
    row.columns[i].jump()
  } else if (animation === 'changeColor') {
    row.columns[i].changeColor(RGBColors.info)
  }
}

export const SentinelSearch: VariantSetup = {
  init: initSentinelSearch,
  visualize: visualizeSentinelSearch
}

type Move = {
  animation: MoveAnimation
  i: number
}
