import { getSandboxSize } from '@/services/Sandbox/sandbox.service'
import { Column, type AnimationConfig } from '@/services/Sandbox/elements/Column'

export const Row = (values: number[]): RowInstance => {
  const row: RowInstance = {
    columns: [],
    draw,
    swapColumns
  }

  const MARGIN = 30
  const { width, height } = getSandboxSize()
  const valuesSize = values.length
  const spacing = (width - MARGIN * 2) / valuesSize

  for (let i = 0; i < valuesSize; i++) {
    const xAxis = i * spacing + spacing / 2 + MARGIN
    const yAxis = height - MARGIN - i * 3
    const columnHeight = height * 0.75 * values[i]

    row.columns[i] = Column({
      x: xAxis,
      y: yAxis,
      width: spacing - 4,
      height: columnHeight
    })
  }

  draw()

  return row

  function swapColumns(indexes: [number, number], config: Partial<AnimationConfig> = {}) {
    const [i, j] = indexes

    row.columns[i].moveTo(row.columns[j], config)
    row.columns[j].moveTo(row.columns[i], { ...config, yOffset: -1 })
    ;[row.columns[i], row.columns[j]] = [row.columns[j], row.columns[i]]
  }

  function draw() {
    let isChanged = false

    for (const column of row.columns) {
      isChanged = column.draw() || isChanged
    }

    return isChanged
  }
}

export type RowInstance = {
  columns: Column[]
  draw: () => boolean
  swapColumns: (indexes: [number, number], config?: Partial<AnimationConfig>) => void
}
