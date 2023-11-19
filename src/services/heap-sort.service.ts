import { initAnimation, SANDBOX_TRANSITION } from '@/services/Sandbox/sandbox.service'
import { generateNonSortedArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import { Heap, type HeapInstance } from '@/services/Sandbox/elements/Heap'
import type { MoveAnimation as ColumnMoveAnimation } from '@/services/Sandbox/elements/Column'
import type { MoveAnimation } from '@/services/Sandbox/elements/Point'
import { Connection } from '@/services/Sandbox/elements/Connection'
import { Row, type RowInstance } from '@/services/Sandbox/elements/Row'
import { RGBColors } from '@/utils'
import { DEFAULT_COLOR } from '@/services/Sandbox/elements/Point'

let lateMoves: ArrayMove[] = []
let moves: Move[] = []
let values: number[] = []
let heap: HeapInstance | undefined = undefined
let row: RowInstance | undefined = undefined
let view: View = 'graph'
const SAFE_ARRAY_SIZE = 30

const initHeapSort = () => {
  view = 'graph'
  row = undefined
  moves = []
  lateMoves = []
  values = generateNonSortedArray(SAFE_ARRAY_SIZE).map((value) => {
    return Math.floor(value * 50)
  })

  heap = Heap(values)

  initAnimation(animateHeapSort)
}

const visualizeHeapSort = () => {
  heapSort()
}

function heapSort() {
  for (let i = Math.floor(values.length / 2) - 1; i >= 0; i--) {
    heapify(values.length, i)
  }

  row = Row(values.map((value) => value / 50))

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

      if (!row) {
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
  const draw = view === 'array' ? row!.draw : heap!.draw
  const isChanged = draw()
  const isArrayView = moves.length === 0 && lateMoves.length > 0

  if (isArrayView && !isChanged) {
    const sandboxContainer = document.getElementById('sandbox-container')!

    if (sandboxContainer.classList.contains('invisible')) return

    sandboxContainer.classList.add('invisible')

    setTimeout(() => {
      moves = lateMoves
      view = 'array'

      sandboxContainer.classList.remove('invisible')
    }, SANDBOX_TRANSITION)
  }

  if (isChanged || !moves.length) return

  const move = moves.shift()!

  if (view === 'array' && row) {
    const {
      indexes: [i, j]
    } = move

    row.columns[i].jump()
    row.columns[j].jump()

    row.swapColumns([i, j])
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

      parent.changeColor(RGBColors.positive)
      node.changeColor(RGBColors.positive)
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
      parent.changeColor(DEFAULT_COLOR)
      node.changeColor(DEFAULT_COLOR)
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
  animation: ColumnMoveAnimation
  indexes: [number, number]
}

type View = 'graph' | 'array'
