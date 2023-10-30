import { getSandboxSize } from '@/services/SandboxService/sandbox.service'
import { Column } from '@/services/SandboxService/elements/Column'
import { Point as createPoint, type Point } from '@/services/SandboxService/elements/Point'
import {
  Connection as createConnection,
  type Connection
} from '@/services/SandboxService/elements/Connection'
import { createEdges } from '@/utils/delaunayTriangulation'

export const renderArray = (values: number[]) => {
  const MARGIN = 30
  const { width, height } = getSandboxSize()
  const valuesSize = values.length
  const columns: Column[] = []
  const spacing = (width - MARGIN * 2) / valuesSize

  for (let i = 0; i < valuesSize; i++) {
    const xAxis = i * spacing + spacing / 2 + MARGIN
    const yAxis = height - MARGIN - i * 3
    const columnHeight = 400 * values[i]

    columns[i] = Column({
      x: xAxis,
      y: yAxis,
      width: spacing - 4,
      height: columnHeight
    })
  }

  return columns
}

type RenderGraphResponse = {
  points: Point[]
  connections: Connection[]
}

export const renderGraph = (values: number[], undirected = false): RenderGraphResponse => {
  const points: Point[] = []
  const MARGIN = 40
  const { width, height } = getSandboxSize()

  for (let i = 0; i < values.length; i++) {
    let x = generateRandomX()
    let y = generateRandomY()
    let validPoint = validatePoint({ x, y })

    while (!validPoint) {
      x = generateRandomX()
      y = generateRandomY()

      validPoint = validatePoint({ x, y })
    }

    points.push(createPoint({ x, y }))
  }

  const edges = createEdges(points)
  const connections: Connection[] = []

  edges.forEach(([startAt, finishAt]) => {
    const connection = createConnection({ startAt, finishAt })
    if (undirected) {
      const connection = createConnection({ startAt: finishAt, finishAt: startAt })
      connections.push(connection)
      finishAt.connections.push(connection)
    }

    connections.push(connection)
    startAt.connections.push(connection)
  })

  return { points, connections }

  function generateRandomX() {
    return Math.random() * (width - MARGIN)
  }

  function generateRandomY() {
    return Math.random() * (height - MARGIN)
  }

  function validatePoint({ x, y }: Pick<Point, 'x' | 'y'>) {
    const MARGIN = 25

    return points.every((point) => {
      return calculateDistance(point, { x, y }) >= MARGIN
    })

    function calculateDistance(pointA: Point, pointB: Pick<Point, 'x' | 'y'>) {
      return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2)
    }
  }
}
