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
    const x = Math.random() * (width - MARGIN)
    const y = Math.random() * (height - MARGIN)
    points.push(createPoint({ x, y }))
  }

  const edges = createEdges(points)
  const connections: Connection[] = []

  edges.forEach(([start, end]) => {
    const startAt = createPoint({ x: start.x, y: start.y })
    const finishAt = createPoint({ x: end.x, y: end.y })

    const hasConnection = connections.some((connection) => {
      const isPoint1ConnectedToPoint2 =
        connection.startAt.x === startAt.x &&
        connection.startAt.y === startAt.y &&
        connection.finishAt.x === finishAt.x &&
        connection.finishAt.y === finishAt.y

      const isPoint2ConnectedToPoint1 =
        connection.startAt.x === finishAt.x &&
        connection.startAt.y === finishAt.y &&
        connection.finishAt.x === startAt.x &&
        connection.finishAt.y === startAt.y

      return isPoint1ConnectedToPoint2 || isPoint2ConnectedToPoint1
    })

    if (!hasConnection) {
      connections.push(createConnection({ startAt, finishAt }))
    }
  })

  return { points, connections }
}
