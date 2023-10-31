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

  const { width, height } = getSandboxSize()

  for (let i = 0; i < values.length; i++) {
    let x = generateRandomX()
    let y = generateRandomY()

    while (!validatePoint({ x, y })) {
      x = generateRandomX()
      y = generateRandomY()
    }

    points.push(createPoint({ x, y }))
  }

  const edges = createEdges(points)
  const connections: Connection[] = []

  edges.forEach(([startAt, finishAt]) => {
    const connection = createConnection({ startAt, finishAt })
    connections.push(connection)
    startAt.connections.push(connection)

    if (undirected) {
      const connection = createConnection({ startAt: finishAt, finishAt: startAt })
      connections.push(connection)
      finishAt.connections.push(connection)
    }
  })

  return { points, connections }

  function generateRandomX() {
    return Math.random() * width
  }

  function generateRandomY() {
    return Math.random() * height
  }

  function validatePoint({ x, y }: Pick<Point, 'x' | 'y'>) {
    return points.every((point) => point.validatePoint({ x, y }))
  }
}
