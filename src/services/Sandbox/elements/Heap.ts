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

  const levels = Math.ceil(Math.log2(values.length))

  let x = width / 2

  const yIncrement = height / (levels + 1)
  const points = []

  for (let level = 0; level <= levels; level++) {
    const nodesInLevel = Math.pow(2, level)
    const xIncrement = width / (nodesInLevel + 1)

    for (let position = 0; position < nodesInLevel; position++) {
      const y = yIncrement * (level + 1)

      points.push([x, y])
      heap.points.push(Point({ x, y }))

      // TODO Think about x coord calculation for each row
      x += xIncrement
    }

    x = width / 2
  }

  console.log(heap.points)

  // const levels = Math.floor(Math.log2(values.length))
  // const nodeWidth = width / Math.pow(2, levels)
  // const nodeHeight = 70
  // const valuesCopy = [...values]
  //
  // for (let level = 0; level <= levels; level++) {
  //   const nodesInLevel = Math.pow(2, level)
  //
  //   for (let node = 0; node < nodesInLevel; node++) {
  //     const value = valuesCopy.shift()
  //     const isEven = node % 2 === 0
  //     const test = isEven ? -node : node
  //
  //     const x = width / 2 + nodeWidth * test
  //     const y = nodeHeight * level + nodeHeight
  //
  //     heap.points.push(Point({ x, y, value }))

  // if (level > 0) {
  //   const connection = Connection()
  //
  //   heap.connections
  //   const parentX = (nodeWidth / 2) + nodeWidth * Math.floor((position - 1) / 2);
  //   const parentY = nodeHeight * (level - 1);
  // }
  //   }
  // }

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
