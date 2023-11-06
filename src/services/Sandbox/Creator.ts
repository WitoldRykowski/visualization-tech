import { getSandboxSize } from '@/services/Sandbox/sandbox.service'
import { Column } from '@/services/Sandbox/elements/Column'
import { Point as createPoint, type Point } from '@/services/Sandbox/elements/Point'

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

export const getHeapStructure = (values: number[]) => {
  const points: Point[] = []
  const { width } = getSandboxSize()
  const x = width / 2
  const y = 30

  const point = createPoint({ x, y })

  points.push(point)
  // TODO draw heap

  return points
}
