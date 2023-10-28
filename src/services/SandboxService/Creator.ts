import { getSandboxSize } from '@/services/SandboxService/sandbox.service'
import { Column } from '@/services/SandboxService/elements/Column'
import { Point as createPoint, type Point } from '@/services/SandboxService/elements/Point'
import {
  Connection as createConnection,
  type Connection
} from '@/services/SandboxService/elements/Connection'
import Delaunator from 'delaunator'

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
  const edges = []

  const MARGIN = 20
  const { width, height } = getSandboxSize()

  for (let i = 0; i < values.length; i++) {
    const x = calculateXWithMargin()
    const y = calculateYWithMargin()
    points.push(createPoint(x, y))
  }

  // https://github.com/mapbox/delaunator
  // Library for Delaunay triangulation is implemented to create
  // non-crossing connections between points in easy way
  const delaunay = Delaunator.from(points.map((point) => [point.x, point.y]))

  for (let i = 0; i < delaunay.triangles.length; i += 3) {
    const point1 = points[delaunay.triangles[i]]
    const point2 = points[delaunay.triangles[i + 1]]
    const point3 = points[delaunay.triangles[i + 2]]

    edges.push([point1, point2])
    edges.push([point2, point3])
    edges.push([point3, point1])
  }

  const connections: Connection[] = edges.map(([start, end]) => {
    const point1 = createPoint(start.x, start.y)
    const point2 = createPoint(end.x, end.y)
    return createConnection(point1, point2)
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
