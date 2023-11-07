import { Point } from '@/services/Sandbox/elements/Point'
import { Connection } from '@/services/Sandbox/elements/Connection'
import { getSandboxSize } from '@/services/Sandbox/sandbox.service'

export const Heap = (values: number[]): HeapInstance => {
  const heap: HeapInstance = {
    points: [],
    connections: [],
    draw
  }

  const { width } = getSandboxSize()

  const queue = []
  const root = Point({ x: width / 2 - 10, y: 50, value: values[0] })

  heap.points.push(root)
  // TODO Fix the order
  queue.push(root)
  const levels = Math.ceil(Math.log2(values.length + 1))

  for (let level = 1; level < levels; level++) {
    const nodesAtLevel = 2 ** level
    const xIncrease = width / 2 / nodesAtLevel

    for (let node = 1; node < nodesAtLevel; node += 2) {
      const parent = queue.shift()!

      const left = Point({ x: parent.x - xIncrease, y: parent.y + 50 })
      const right = Point({ x: parent.x + xIncrease, y: parent.y + 50 })

      heap.points.push(left)
      const leftConnection = Connection({ startAt: parent, finishAt: left })
      left.connections.push(leftConnection)
      heap.connections.push(leftConnection)
      if (heap.points.length === values.length) break

      heap.points.push(right)
      const rightConnection = Connection({ startAt: parent, finishAt: right })
      right.connections.push(rightConnection)
      heap.connections.push(rightConnection)
      if (heap.points.length === values.length) break

      queue.push(right)
      queue.push(left)
    }
  }

  console.log(heap.points)

  draw()

  return heap

  function draw() {
    let isChanged = false

    for (const connection of heap.connections) {
      isChanged = connection.draw() || isChanged
    }

    for (const point of heap.points) {
      isChanged = point.draw() || isChanged
    }

    return isChanged
  }
}

export type HeapInstance = {
  points: Point[]
  connections: Connection[]
  draw: () => boolean
}
