import { getSandboxSize } from '@/services/SandboxService/sandbox.service'
import { Column } from './Column'

const DEFAULT_ARRAY_SIZE = 50

export const generateSortedArray = (size = DEFAULT_ARRAY_SIZE) => {
  const sortedArray: number[] = []
  const SAFE_HEIGHT_MULTIPLIER = 50

  for (let i = 1; i <= size; i++) {
    sortedArray.push(i / SAFE_HEIGHT_MULTIPLIER)
  }

  return sortedArray
}

export const generateNonSortedArray = (size = DEFAULT_ARRAY_SIZE) => {
  const nonSortedArray: number[] = []

  for (let i = 0; i < size; i++) {
    nonSortedArray.push(Math.random())
  }

  return nonSortedArray
}

export const renderArray = (values: number[]) => {
  const MARGIN = 30
  const size = getSandboxSize()
  const valuesSize = values.length
  const columns: Column[] = []
  const spacing = (size.width - MARGIN * 2) / valuesSize

  for (let i = 0; i < valuesSize; i++) {
    const xAxis = i * spacing + spacing / 2 + MARGIN
    const yAxis = size.height - MARGIN - i * 3
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
