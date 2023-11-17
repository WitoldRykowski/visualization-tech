import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { Heap, type HeapInstance } from '@/services/Sandbox/elements/Heap'
import type { MoveAnimation } from '@/services/Animation/animation.service'
import { Connection } from '@/services/Sandbox/elements/Connection'
import { Array as createArray, type ArrayInstance } from '@/services/Sandbox/elements/Array'

let lateMoves: ArrayMove[] = []
let moves: Move[] = []
let values: number[] = []
let heap: HeapInstance | undefined = undefined
let Array: ArrayInstance | undefined = undefined
let finished = false
let view: View = 'graph'
const SAFE_ARRAY_SIZE = 10

const initHeapSort = () => {
  view = 'graph'
  Array = undefined
  moves = []
  lateMoves = []
  values = generateNonSortedArray(SAFE_ARRAY_SIZE).map((value) => {
    return Math.floor(value * 50)
  })

  heap = Heap(values)

  // TODO refactor
  initAnimation(animateHeapSort)
}

const visualizeHeapSort = () => {
  heapSort()
  finished = true
}

function heapSort() {
  for (let i = Math.floor(values.length / 2) - 1; i >= 0; i--) {
    heapify(values.length, i)
  }

  Array = createArray(values.map((value) => value / 100))

  for (let i = values.length - 1; i > 0; i--) {
    ;[values[i], values[0]] = [values[0], values[i]]

    lateMoves.push({
      animation: 'swap',
      indexes: [i, 0]
    })

    heapify(i, 0)
  }

  function heapify(n: number, i: number) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && values[left] > values[largest]) {
      largest = left
    }

    if (right < n && values[right] > values[largest]) {
      largest = right
    }

    if (largest !== i) {
      ;[values[i], values[largest]] = [values[largest], values[i]]

      if (!Array) {
        moves.push({
          animation: 'move',
          indexes: [i, largest],
          originalCoordinates: {
            parent: { x: heap!.points[i].x, y: heap!.points[i].y },
            node: { x: heap!.points[largest].x, y: heap!.points[largest].y }
          }
        })

        moves.push({
          animation: 'swap',
          indexes: [i, largest],
          originalCoordinates: {
            parent: { x: heap!.points[i].x, y: heap!.points[i].y },
            node: { x: heap!.points[largest].x, y: heap!.points[largest].y }
          }
        })
      } else {
        lateMoves.push({
          animation: 'swap',
          indexes: [i, largest]
        })
      }

      heapify(n, largest)
    }
  }
}

function animateHeapSort() {
  const isArrayView = finished && moves.length === 0 && lateMoves.length > 0

  if (isArrayView) {
    setTimeout(() => {
      moves = lateMoves
      view = 'array'
    }, 1000)
  }

  const draw = view === 'array' ? Array!.draw : heap!.draw

  const isChanged = draw()

  if (isChanged || !moves.length) return

  const move = moves.shift()!

  if (view === 'array' && Array) {
    const {
      indexes: [i, j]
    } = move

    Array.columns[i].jump()
    Array.columns[j].jump()

    Array.columns[i].moveTo(Array.columns[j])
    Array.columns[j].moveTo(Array.columns[i], { yOffset: -1 })
    ;[Array.columns[i], Array.columns[j]] = [Array.columns[j], Array.columns[i]]
  } else {
    moveNode(move as GraphMove)
  }

  function moveNode(move: GraphMove) {
    if (!heap) {
      throw Error('Heap does not exist!')
    }

    const {
      animation,
      indexes: [i, j],
      originalCoordinates
    } = move

    const parent = heap.points[i]
    const node = heap.points[j]

    if (animation === 'move') {
      const connectionMiddleXAxis = (parent.x + node.x) / 2
      const connectionMiddleYAxis = (parent.y + node.y) / 2

      parent.moveTo({ x: connectionMiddleXAxis, y: connectionMiddleYAxis })
      node.moveTo({ x: connectionMiddleXAxis, y: connectionMiddleYAxis })
    } else {
      const grandparent = heap!.getPointParent(parent)

      for (let i = 0; i < heap.connections.length; i++) {
        const connection = heap.connections[i]
        const startId = connection.startAt.id
        const finishId = connection.finishAt.id

        if (startId === grandparent?.id && finishId === parent.id) {
          heap.connections[i] = Connection({
            startAt: heap.connections[i].startAt,
            finishAt: node
          })
        } else if (startId === node.id) {
          heap.connections[i] = Connection({
            startAt: parent,
            finishAt: heap.connections[i].finishAt
          })
        } else if (startId === parent.id) {
          const isNode = finishId === node.id
          const finishAt = isNode ? parent : heap.connections[i].finishAt

          heap.connections[i] = Connection({
            startAt: node,
            finishAt
          })
        }
      }

      parent.moveTo({ x: originalCoordinates.node.x, y: originalCoordinates.node.y })
      node.moveTo({ x: originalCoordinates.parent.x, y: originalCoordinates.parent.y })
      ;[heap.points[j], heap.points[i]] = [heap.points[i], heap.points[j]]
    }
  }
}

export const HeapSort: VariantSetup = {
  init: initHeapSort,
  visualize: visualizeHeapSort
}

export type Move = GraphMove | ArrayMove

type GraphMove = {
  animation: MoveAnimation
  indexes: [number, number]
  originalCoordinates: {
    parent: { x: number; y: number }
    node: { x: number; y: number }
  }
}

type ArrayMove = {
  animation: MoveAnimation
  indexes: [number, number]
}

type View = 'graph' | 'array'
