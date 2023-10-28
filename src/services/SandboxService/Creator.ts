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

export const renderGraph = (values: number[]): RenderGraphResponse => {
  const points: Point[] = []

  const MARGIN = 20
  const { width, height } = getSandboxSize()

  for (let i = 0; i < values.length; i++) {
    const x = calculateXWithMargin()
    const y = calculateYWithMargin()
    points.push(createPoint({ x, y }))
  }

  const edges = createEdges(points)
  const connections: Connection[] = []

  edges.forEach(([start, end]) => {
    const point1 = createPoint({ x: start.x, y: start.y })
    const point2 = createPoint({ x: end.x, y: end.y })

    const existingConnection = connections.find((connection) => {
      return (
        (connection.startAt.x === point1.x &&
          connection.startAt.y === point1.y &&
          connection.finishAt.x === point2.x &&
          connection.finishAt.y === point2.y) ||
        (connection.startAt.x === point2.x &&
          connection.startAt.y === point2.y &&
          connection.finishAt.x === point1.x &&
          connection.finishAt.y === point1.y)
      )
    })

    if (!existingConnection) {
      connections.push(createConnection({ startAt: point1, finishAt: point2 }))
    }
  })

  function calculateXWithMargin() {
    const x = Math.random() * width
    const margin = x > width / 2 ? -MARGIN : MARGIN

    return x + margin
  }

  function calculateYWithMargin() {
    const y = Math.random() * height
    const margin = y > height / 2 ? -MARGIN : MARGIN

    return y + margin
  }

  return { points, connections }
}
