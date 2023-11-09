import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { Heap, type HeapInstance } from '@/services/Sandbox/elements/Heap'
import type { MoveAnimation } from '@/services/Animation/animation.service'

let moves: Move[] = []
let values: number[] = []
let heap: HeapInstance | undefined = undefined
const SAFE_ARRAY_SIZE = 5 //30

const initHeapSort = () => {
  initAnimation(init, animateHeapSort)

  function init() {
    moves = []
    values = generateNonSortedArray(SAFE_ARRAY_SIZE).map((value) => {
      return Math.floor(value * 50)
    })
  }

  heap = Heap(values)
}

const visualizeHeapSort = () => {
  heapSort()
}

function heapSort() {
  for (let i = Math.floor(values.length / 2) - 1; i >= 0; i--) {
    heapify(values.length, i)
  }

  // Extract elements one by one
  for (let i = values.length - 1; i > 0; i--) {
    ;[values[i], values[0]] = [values[0], values[i]] // Swap the root (maximum element) with the last element
    heapify(i, 0) // Call max heapify on the reduced heap
  }

  function heapify(n: number, i: number) {
    let largest = i
    let largestNeighbor = -1
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && values[left] > values[largest]) {
      largest = left
      largestNeighbor = right
    }

    // If the right child is larger than the largest so far
    if (right < n && values[right] > values[largest]) {
      largest = right
      largestNeighbor = left
    }

    // If the largest element is not the root
    if (largest !== i) {
      ;[values[i], values[largest]] = [values[largest], values[i]] // Swap them

      moves.push({
        animation: 'move',
        indexes: [i, largest, largestNeighbor],
        originalCoordinates: {
          i: { x: heap!.points[i].x, y: heap!.points[i].y },
          j: { x: heap!.points[largest].x, y: heap!.points[largest].y }
        }
      })

      moves.push({
        animation: 'swap',
        indexes: [i, largest, largestNeighbor],
        originalCoordinates: {
          i: { x: heap!.points[i].x, y: heap!.points[i].y },
          j: { x: heap!.points[largest].x, y: heap!.points[largest].y }
        }
      })

      // Recursively heapify the affected sub-tree
      heapify(n, largest)
    }
  }
}

function animateHeapSort() {
  if (!heap) return

  const isChanged = heap.draw()

  if (isChanged || !moves.length) return

  const {
    animation,
    indexes: [i, j, neighbor],
    originalCoordinates
  } = moves.shift()!

  if (animation === 'move') {
    const connectionMiddleXAxis = (heap.points[i].x + heap.points[j].x) / 2
    const connectionMiddleYAxis = (heap.points[i].y + heap.points[j].y) / 2

    heap.points[i].moveTo({ x: connectionMiddleXAxis, y: connectionMiddleYAxis })
    heap.points[j].moveTo({ x: connectionMiddleXAxis, y: connectionMiddleYAxis })

    // TODO Prawie działa, ale trzeba jeszcze dodawać connections w heap
    // const index = heap.points[neighbor].connections.get(heap.points[j])
    // heap.points[neighbor].connections.delete(heap.points[j])
    //
    // if (index !== undefined) {
    //   heap.connections[index].startAt = heap.points[i]
    //   heap.points[neighbor].connections.set(heap.points[i], index)
    // } else {
    //   const test = heap.connections.findIndex((connection) => {
    //     return (
    //       connection.startAt.x === heap!.points[j].x &&
    //       connection.finishAt.x === heap!.points[neighbor].x
    //     )
    //   })
    //
    //   heap.connections.splice(test, 1)
    // }
    ;[heap.points[i].connections, heap.points[j].connections] = [
      heap.points[j].connections,
      heap.points[i].connections
    ]
  } else if (animation === 'swap') {
    heap.points[i].moveTo({ x: originalCoordinates.j.x, y: originalCoordinates.j.y })
    heap.points[j].moveTo({ x: originalCoordinates.i.x, y: originalCoordinates.i.y })
    ;[heap.points[i], heap.points[j]] = [heap.points[j], heap.points[i]]
  }
}

export const HeapSort: VariantSetup = {
  init: initHeapSort,
  visualize: visualizeHeapSort
}

export type Move = {
  animation: MoveAnimation
  indexes: [number, number, number]
  originalCoordinates: {
    i: { x: number; y: number }
    j: { x: number; y: number }
  }
}
