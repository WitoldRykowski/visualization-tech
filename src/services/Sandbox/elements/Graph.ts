import type { Connection } from '@/services/Sandbox/elements/Connection'
import type { Point } from '@/services/Sandbox/elements/Point'
import { getSandboxSize } from '@/services/Sandbox/sandbox.service'
import { Point as createPoint } from '@/services/Sandbox/elements/Point'
import { createEdges } from '@/utils/delaunayTriangulation'
import { Connection as createConnection } from '@/services/Sandbox/elements/Connection'

export const Graph = (): Graph => {
  const graph: Graph = {
    points: [],
    connections: [],
    draw,
    getPointConnections,
    getConnectionsBetweenPoints,
    createGraph
  }

  return graph

  function getPointConnections(point: Point) {
    return graph.connections.filter(({ startAt }) => startAt.id === point.id)
  }

  function getConnectionsBetweenPoints(start: Point, destination: Point) {
    return graph.connections.filter(({ startAt, finishAt }) => {
      const isMatched = startAt.id === start.id && finishAt.id === destination.id
      const isMatchedReverse = startAt.id === destination.id && finishAt.id === start.id

      return isMatched || isMatchedReverse
    })
  }

  function draw() {
    let isChanged = false

    for (const connection of graph.connections) {
      isChanged = connection.draw() || isChanged
    }

    for (const point of graph.points) {
      isChanged = point.draw() || isChanged
    }

    return isChanged
  }

  function createGraph(values: number[]) {
    for (let i = 0; i < values.length; i++) {
      let x = generateRandomX()
      let y = generateRandomY()

      while (!validatePoint({ x, y })) {
        x = generateRandomX()
        y = generateRandomY()
      }

      graph.points.push(createPoint({ x, y, id: i + 1 }))
    }

    const edges = createEdges(graph.points)

    // Graph always will be non directed so every connection
    // connect point A to point B and point B to point A (two-way binding)
    edges.forEach(([startAt, finishAt]) => {
      const connection = createConnection({ startAt, finishAt })
      graph.connections.push(connection)

      const reverseConnection = createConnection({ startAt: finishAt, finishAt: startAt })
      graph.connections.push(reverseConnection)
    })

    draw()
  }

  function generateRandomX() {
    const { width } = getSandboxSize()

    return Math.random() * width
  }

  function generateRandomY() {
    const { height } = getSandboxSize()
    return Math.random() * height
  }

  function validatePoint({ x, y }: Pick<Point, 'x' | 'y'>) {
    return graph.points.every((point) => point.validatePoint({ x, y }))
  }
}

export type Graph = {
  points: Point[]
  connections: Connection[]
  getPointConnections: (point: Point) => Connection[]
  getConnectionsBetweenPoints: (start: Point, destination: Point) => Connection[]
  createGraph: (values: number[]) => void
  draw: () => boolean
}
