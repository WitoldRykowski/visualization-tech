import { Column, type MoveAnimation } from '@/services/ArrayService/Column'
import { generateSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { animate, stopAnimation } from '@/services/SandboxService/sandbox.service'

type Move = {
  min: number
  max: number
  guess: number
  target: number
  animation: MoveAnimation
}

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initBinarySearch = () => {
  values = generateSortedArray()
  columns = renderArray(values, 8)
  moves = []

  stopAnimation()
  animate(animateBinarySearch)
}

export const visualizeBinarySearch = () => {
  moves = binarySearch(values)!
}

const binarySearch = (values: number[]) => {
  let guess = 0
  let min = 0
  let max = values.length - 1
  const target = Math.floor(Math.random() * values.length)

  while (max >= min) {
    guess = Math.floor((max + min) / 2)

    columns[guess].color = 'red'

    moves.push({
      min,
      max,
      guess,
      target,
      animation: 'collapse'
    })

    if (values[guess] > target) {
      max = guess - 1
    } else if (values[guess] < target) {
      min = guess + 1
    } else {
      min = max = guess
      break
    }
  }

  moves.push({
    min,
    max,
    guess,
    target,
    animation: 'collapse'
  })

  return moves
}

const animateBinarySearch = () => {
  let isChanged = false

  for (let i = 0; i < columns.length; i++) {
    isChanged = columns[i].draw() || isChanged
  }

  if (!isChanged && moves.length > 0) {
    const move = moves.shift()!
    const { min, max, guess, target } = move

    for (let i = min; i <= max; i++) {
      if (values[i] !== target) {
        for (let i = 0; i < columns.length; i++) {
          if (i < min) {
            //
          } else {
            //
          }
        }
      }
    }
  }
}
