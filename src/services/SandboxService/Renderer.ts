import { getSandboxSize } from '@/services/SandboxService/sandbox.service'
import { Column } from '@/services/SandboxService/elements/Column'
import { Point as createPoint, type Point } from '@/services/SandboxService/elements/Point'
import { Segment as createSegment, type Segment } from '@/services/SandboxService/elements/Segment'

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

export const renderGraph = (values: number[]) => {
  const points: Point[] = []
  const segments: Segment[] = []

  const MARGIN = 20
  const { width, height } = getSandboxSize()

  for (let i = 0; i < values.length; i++) {
    const x = getX(i)
    const y = getY(i)

    const point = createPoint(x, y)
    points.push(point)

    points.sort((a, b) => a.x - b.x)

    for (let i = 1; i < points.length; i++) {
      const segment = createSegment(points[i], points[i - 1])
      segments.push(segment)

      if (i > 1) {
        const segment = createSegment(points[i], points[i - 2])
        segments.push(segment)
      }
    }

    // if (points.length > 1) {
    //   segments.push(createSegment(points[i], points[i - 1]))
    // }
    //
    // if (i === values.length - 1) {
    //   segments.push(createSegment(points[i], points[i - 2]))
    // }
  }

  function getX(i: number) {
    const t = i / points.length
    const x = (Math.random() * width) / t

    if (x > width / 2) {
      return x - MARGIN
    }

    return x + MARGIN
  }

  function getY(i: number) {
    const t = i / points.length

    const y = (Math.random() * height) / t

    if (y > height / 2) {
      return y - MARGIN
    }

    return y + MARGIN
  }

  // for (let i = 0; i < points.length - 1; i++) {
  //   segments.push(createSegment(points[i], points[i + 1]))
  // }
  //
  // for (let i = 0; i < points.length; i++) {
  //   const greatestIndex = points.length - 1
  //   let index = i
  //   while (index !== i) {
  //     index = Math.random() * greatestIndex
  //   }
  //   segments.push(createSegment(points[i], points[index]))
  // }

  return { points, segments }
}
