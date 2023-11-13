import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { Heap, type HeapInstance } from '@/services/Sandbox/elements/Heap'
import type { MoveAnimation } from '@/services/Animation/animation.service'

let moves: Move[] = []
let values: number[] = []
let heap: HeapInstance | undefined = undefined
const SAFE_ARRAY_SIZE = 4 //30

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
  let test = false
  for (let i = Math.floor(values.length / 2) - 1; i >= 0; i--) {
    heapify(values.length, i)
  }

  test = true

  console.log(values)

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

      if (!test) {
        moves.push({
          animation: 'move',
          indexes: [i, largest, largestNeighbor],
          originalCoordinates: {
            parent: { x: heap!.points[i].x, y: heap!.points[i].y },
            node: { x: heap!.points[largest].x, y: heap!.points[largest].y }
          }
        })

        moves.push({
          animation: 'swap',
          indexes: [i, largest, largestNeighbor],
          originalCoordinates: {
            parent: { x: heap!.points[i].x, y: heap!.points[i].y },
            node: { x: heap!.points[largest].x, y: heap!.points[largest].y }
          }
        })
      }

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
    indexes: [parent, node, neighbor],
    originalCoordinates
  } = moves.shift()!

  if (animation === 'move') {
    const connectionMiddleXAxis = (heap.points[parent].x + heap.points[node].x) / 2
    const connectionMiddleYAxis = (heap.points[parent].y + heap.points[node].y) / 2

    heap.points[parent].moveTo({ x: connectionMiddleXAxis, y: connectionMiddleYAxis })
    heap.points[node].moveTo({ x: connectionMiddleXAxis, y: connectionMiddleYAxis })
    // TODO we should map points by unique id or name field, because
    // TODO there is no way to handle connections matching by x and y coordinates
    // TODO generally it is possible but will generate big mess in code

    const parentIndex = Array.from(heap.points[parent].connections.values())[0]
    const index = heap.points[node].connections.get(heap.points[parent].id)!
    heap.connections[index].startAt = heap.points[node]
    heap.connections[index].finishAt = heap.points[parent]
    heap.points[node].connections = new Map()
    heap.points[parent].connections = new Map([[heap.points[node].id, index]])

    if (heap.points[neighbor]) {
      const index2 = heap.points[neighbor].connections.get(heap.points[parent].id)!
      heap.connections[index2].startAt = heap.points[node]
      heap.points[neighbor].connections = new Map([[heap.points[node].id, index2]])
    }

    if (parentIndex) {
      heap.connections[parentIndex].finishAt = heap.points[node]
      heap.points[node].connections.set(heap.connections[parentIndex].startAt.id, parentIndex)
    }
  } else if (animation === 'swap') {
    heap.points[parent].moveTo({ x: originalCoordinates.node.x, y: originalCoordinates.node.y })
    heap.points[node].moveTo({ x: originalCoordinates.parent.x, y: originalCoordinates.parent.y })
    ;[heap.points[parent], heap.points[node]] = [heap.points[node], heap.points[parent]]

    console.log(heap.points, 'swap')

    // console.log(heap.connections)
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
    parent: { x: number; y: number }
    node: { x: number; y: number }
  }
}
