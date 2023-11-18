import { DEFAULT_COLOR } from '@/services/Sandbox/elements/Column'
import { generateNonSortedArray } from '@/services/Array/array.service'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { RGBColors } from '@/utils'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { MoveAnimation } from '@/services/Sandbox/elements/Column'
import { Row, type RowInstance } from '@/services/Sandbox/elements/Row'

let moves: Move[] = []
let values: number[] = []
let row: RowInstance | undefined = undefined

const initGnomeSort = () => {
  values = generateNonSortedArray()
  row = Row(values)
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
  if (!row) return

  const isChanged = row.draw()

  if (isChanged || !moves.length) return

  const { animation, left, right } = moves.shift()!

  if (animation === 'touch') {
    const color = RGBColors.lightBlue
    if (left !== -1) {
      row.columns[left].changeColor(color)
    }

    row.columns[right].changeColor(color)
  } else if (animation === 'swap') {
    row.columns[left].moveTo(row.columns[right])
    row.columns[right].moveTo(row.columns[left], { yOffset: -1 })
    ;[row.columns[left], row.columns[right]] = [row.columns[right], row.columns[left]]
  } else if (animation === 'jump') {
    row.columns[right].jump()
  } else {
    for (let i = row.columns.length - 1; i >= 0; i--) {
      row.columns[i].changeColor(DEFAULT_COLOR)
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
  getState: () => ({ moves, values, columns: row?.columns ?? [] })
})

type Move = {
  animation: MoveAnimation | 'finish'
  left: number
  right: number
}
