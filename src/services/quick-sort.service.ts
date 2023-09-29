import { Column } from '@/services/ArrayService/Column'
import { generateNonSortedArray, renderArray } from '@/services/ArrayService/array.service'
import { drawColumns, stopAnimation } from '@/services/SandboxService/sandbox.service'

type Move = {}

let moves: Move[] = []
let values: number[] = []
let columns: Column[] = []

export const initQuickSort = () => {
  values = generateNonSortedArray()
  columns = renderArray(values)
  moves = []

  stopAnimation()
  requestAnimationFrame(animateQuickSort)
}

export const visualizeQuickSort = () => {
  moves = quickSort(values, 0, values.length - 1)
}

function quickSort(values: number[], left: number, right: number) {
  if (values.length > 1) {
    const index = partition(values, left, right)

    if (left < index - 1) quickSort(values, left, index - 1)

    if (index < right) quickSort(values, index, right)
  }

  return []

  function partition(array: number[], left: number, right: number) {
    const middle = Math.floor((right + left) / 2)
    const pivot = array[middle]
    let i = left
    let j = right

    while (i <= j) {
      while (array[i] < pivot) i++

      while (array[j] > pivot) j--

      if (i <= j) {
        ;[array[i], array[j]] = [array[j], array[i]]
        i++
        j--
      }
    }

    return i
  }
}

function animateQuickSort() {
  const isChanged = drawColumns(columns)

  if (!isChanged && moves.length > 0) {
    const move = moves.shift()!

    console.log(move)
  }
}
