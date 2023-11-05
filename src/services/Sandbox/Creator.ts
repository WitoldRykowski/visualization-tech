import { getSandboxSize } from '@/services/Sandbox/sandbox.service'
import { Column } from '@/services/Sandbox/elements/Column'
import { Point as createPoint, type Point } from '@/services/Sandbox/elements/Point'
import {
  Connection as createConnection,
  type Connection
} from '@/services/Sandbox/elements/Connection'
import { createEdges } from '@/utils/delaunayTriangulation'

export const getColumns = (values: number[]) => {
  const MARGIN = 30
  const { width, height } = getSandboxSize()
  const valuesSize = values.length
  const columns: Column[] = []
  const spacing = (width - MARGIN * 2) / valuesSize

  for (let i = 0; i < valuesSize; i++) {
    const xAxis = i * spacing + spacing / 2 + MARGIN
    const yAxis = height - MARGIN - i * 3
    const columnHeight = height * 0.75 * values[i]

    columns[i] = Column({
      x: xAxis,
      y: yAxis,
      width: spacing - 4,
      height: columnHeight
    })
  }

  return columns
}

type getGraphStructureResponse = {
  points: Point[]
  connections: Connection[]
}

// Graph always will be non directed so every connection
// connect point A to point B and point B to point A (two-way binding)
export const getGraphStructure = (values: number[]): getGraphStructureResponse => {
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

    const reverseConnection = createConnection({ startAt: finishAt, finishAt: startAt })
    connections.push(reverseConnection)
    finishAt.connections.push(reverseConnection)
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

export const getHeapStructure = (values: number[]) => {
  const points: Point[] = []
  const { width } = getSandboxSize()

  // TODO draw heap

  console.log(points)
  return points
}
