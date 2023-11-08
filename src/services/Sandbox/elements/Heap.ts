import { Point } from '@/services/Sandbox/elements/Point'
import { Connection } from '@/services/Sandbox/elements/Connection'
import { getSandboxSize } from '@/services/Sandbox/sandbox.service'

export const Heap = (values: number[]): HeapInstance => {
  const heap: HeapInstance = {
    points: [],
    connections: [],
    draw
  }

  const { width, height } = getSandboxSize()
  const SPACING_Y = 50
  const queue: Point[] = []
  const valuesCopy = [...values]
  const root = Point({ x: width / 2 - 10, y: SPACING_Y, value: valuesCopy.shift() })

  heap.points.push(root)
  queue.push(root)
  const levels = Math.ceil(Math.log2(values.length + 1))

  for (let level = 1; level < levels; level++) {
    const nodesAtLevel = 2 ** level
    const xIncrease = width / 2 / nodesAtLevel

    // if (valuesCopy.length < nodesAtLevel) {
    //   nodesAtLevel = valuesCopy.length
    // }

    for (let node = 1; node < nodesAtLevel; node += 2) {
      const parent = queue.shift()!
      const left = addNode(parent, -xIncrease)

      queue.push(left)
      if (!valuesCopy.length) break

      const right = addNode(parent, xIncrease)
      queue.push(right)
    }
  }

  function addNode(parent: Point, xModifier: number) {
    const levelsSpacing = (height - 2 * SPACING_Y) / levels
    const node = Point({
      x: parent.x + xModifier,
      y: parent.y + levelsSpacing,
      value: valuesCopy.shift()
    })

    heap.points.push(node)
    const leftConnection = Connection({ startAt: parent, finishAt: node })
    node.connections.push(leftConnection)
    heap.connections.push(leftConnection)

    return node
  }

  draw()

  return heap

  function draw() {
    let isChanged = false

    for (const connection of heap.connections) {
      isChanged = connection.draw() || isChanged
    }

    for (const point of heap.points) {
      isChanged = point.draw(30) || isChanged
    }

    return isChanged
  }
}

export type HeapInstance = {
  points: Point[]
  connections: Connection[]
  draw: () => boolean
}
