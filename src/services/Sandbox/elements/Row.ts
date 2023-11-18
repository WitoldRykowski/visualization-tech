import { getSandboxSize } from '@/services/Sandbox/sandbox.service'
import { Column } from '@/services/Sandbox/elements/Column'

export const Row = (values: number[]): RowInstance => {
  const array: RowInstance = {
    columns: [],
    draw
  }

  const MARGIN = 30
  const { width, height } = getSandboxSize()
  const valuesSize = values.length
  const spacing = (width - MARGIN * 2) / valuesSize

  for (let i = 0; i < valuesSize; i++) {
    const xAxis = i * spacing + spacing / 2 + MARGIN
    const yAxis = height - MARGIN - i * 3
    const columnHeight = height * 0.75 * values[i]

    array.columns[i] = Column({
      x: xAxis,
      y: yAxis,
      width: spacing - 4,
      height: columnHeight
    })
  }

  draw()

  return array

  function draw() {
    let isChanged = false

    for (const column of array.columns) {
      isChanged = column.draw() || isChanged
    }

    return isChanged
  }
}

export type RowInstance = {
  columns: Column[]
  draw: () => boolean
}
