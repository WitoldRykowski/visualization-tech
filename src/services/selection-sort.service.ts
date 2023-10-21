import type { Column, MoveAnimation } from './ArrayService/Column'
import { generateNonSortedArray, renderArray } from './ArrayService/array.service'
import { animate, drawColumns, stopAnimation } from './SandboxService/sandbox.service'
import { convertNamedColorToRGB } from '@/utils'
import { DEFAULT_COLOR } from './ArrayService/Column'

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initSelectionSort = () => {
  values = generateNonSortedArray()
  columns = renderArray(values)
  moves = []

  stopAnimation()
  animate(animateSelectionSort)
}

export const visualizeSelectionSort = () => {
  moves = selectionSort(values)
}

function selectionSort(values: number[]) {
  for (let i = 0; i < values.length - 1; i++) {
    let minIndex = i

    moves.push({
      lastMinIndex: minIndex,
      minIndex,
      indexes: [i, -1],
      animation: 'changeColor'
    })

    for (let j = i + 1; j < values.length; j++) {
      moves.push({
        lastMinIndex: minIndex,
        minIndex,
        indexes: [i, j],
        animation: 'jump'
      })

      if (values[j] < values[minIndex]) {
        moves.push({
          lastMinIndex: minIndex,
          minIndex: j,
          indexes: [i, j],
          animation: 'changeColor'
        })

        minIndex = j
      }
    }

    moves.push({
      lastMinIndex: minIndex,
      minIndex,
      indexes: [i, -1],
      animation: 'swap'
    })
    ;[values[minIndex], values[i]] = [values[i], values[minIndex]]
  }

  return moves
}

function animateSelectionSort() {
  const isChanged = drawColumns(columns)

  if (isChanged || !moves.length) return

  const { minIndex, lastMinIndex, animation, indexes } = moves.shift()!
  const [i, j] = indexes

  if (animation === 'changeColor') {
    if (lastMinIndex !== minIndex) {
      columns[lastMinIndex].changeColor(DEFAULT_COLOR)
    }

    columns[minIndex].changeColor(convertNamedColorToRGB('negative'))
  } else if (animation === 'jump') {
    columns[j].jump()
  } else if (animation === 'swap' && minIndex !== i) {
    const frameCount = 40

    columns[minIndex].jump()
    columns[i].jump()

    columns[minIndex].moveTo(columns[i], { frameCount })
    columns[i].moveTo(columns[minIndex], { yOffset: -1, frameCount })
    ;[columns[minIndex], columns[i]] = [columns[i], columns[minIndex]]
  }
}

type Move = {
  minIndex: number
  lastMinIndex: number
  indexes: [number, number]
  animation: MoveAnimation
}
