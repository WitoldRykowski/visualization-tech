import { Point } from '@/services/Sandbox/elements/Point'
import { Connection } from '@/services/Sandbox/elements/Connection'
import { getSandboxSize } from '@/services/Sandbox/sandbox.service'

export const Heap = (): HeapInstance => {
  const heap: HeapInstance = {
    points: [],
    connections: [],
    draw,
    getPointConnections,
    getPointParent,
    createHeap
  }

  return heap

  function getPointConnections(point: Point) {
    return heap.connections.filter(({ startAt }) => startAt.id === point.id)
  }

  function getPointParent(point: Point) {
    const connection = heap.connections.find(({ finishAt }) => {
      return point.id === finishAt.id
    })

    return connection?.startAt
  }

  function createHeap(values: number[]) {
    const { width, height } = getSandboxSize()
    const SPACING_Y = 50
    const queue: Point[] = []
    const valuesCopy = [...values]
    const root = Point({ x: width / 2 - 10, y: SPACING_Y, value: valuesCopy.shift(), id: 1 })

    heap.points.push(root)
    queue.push(root)
    const levels = Math.ceil(Math.log2(values.length + 1))
    let pointId = root.id + 1

    for (let level = 1; level < levels; level++) {
      let nodesAtLevel = 2 ** level
      const pointsSpacing = width / 2 / nodesAtLevel
      let parent: Point | undefined = undefined

      if (valuesCopy.length < nodesAtLevel) {
        nodesAtLevel = valuesCopy.length
      }

      for (let node = 1; node <= nodesAtLevel; node++) {
        const levelsSpacing = (height - 2 * SPACING_Y) / levels
        const isEven = node % 2 === 0
        parent = isEven ? parent : queue.shift()
        const xModifier = isEven ? pointsSpacing : -pointsSpacing

        const point = Point({
          id: pointId,
          x: parent!.x + xModifier,
          y: parent!.y + levelsSpacing,
          value: valuesCopy.shift()
        })

        pointId++

        heap.points.push(point)
        queue.push(point)

        const connection = Connection({ startAt: parent!, finishAt: point })
        heap.connections.push(connection)
      }
    }

    draw()
  }

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

type HeapInstance = {
  points: Point[]
  connections: Connection[]
  getPointConnections: (point: Point) => Connection[]
  getPointParent: (point: Point) => Point | undefined
  createHeap: (values: number[]) => void
  draw: () => boolean
}
