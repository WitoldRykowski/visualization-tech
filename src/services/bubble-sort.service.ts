import { generateNonSortedArray, renderArray } from './array.service'
import { getCanvas, getContext } from '@/services/sandbox.service'

type Move = {
  indexes: [number, number]
  swap: boolean
}

const bubbleSort = (values: number[]) => {
  const moves: Move[] = []
  let isSwapped = false

  do {
    isSwapped = false

    for (let i = 1; i < values.length; i++) {
      const previousIndex = i - 1

      if (values[previousIndex] > values[i]) {
        isSwapped = true
        ;[values[previousIndex], values[i]] = [values[i], values[previousIndex]]

        moves.push({
          indexes: [previousIndex, i],
          swap: true
        })
      } else {
        moves.push({
          indexes: [previousIndex, i],
          swap: false
        })
      }
    }
  } while (isSwapped)

  return moves
}

export const initBubbleSort = () => {
  const context = getContext()
  const canvas = getCanvas()
  const values = generateNonSortedArray()

  const columns = renderArray(values)
  const moves = bubbleSort(values)

  return () => {
    animate()

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height)
      let isChanged = false

      for (let i = 0; i < columns.length; i++) {
        isChanged = columns[i].draw() || isChanged
      }

      if (!isChanged && moves.length > 0) {
        const move = moves.shift()!

        const [i, j] = move.indexes

        if (move.swap) {
          columns[i].moveTo(columns[j])
          columns[j].moveTo(columns[i], -1)
          ;[columns[i], columns[j]] = [columns[j], columns[i]]
        } else {
          // TODO
        }
      }

      requestAnimationFrame(animate)
    }
  }
}
