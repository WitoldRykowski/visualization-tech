import { getCanvas } from '@/services/SandboxService/sandbox.service'
import { Column } from './Column'

const DEFAULT_ARRAY_SIZE = 70
const MARGIN = 30

export const generateSortedArray = (size = DEFAULT_ARRAY_SIZE) => {
  const sortedArray: number[] = []

  for (let i = 1; i <= size; i++) {
    sortedArray.push(i)
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

export const renderArray = (values: number[], columnHeightMultiplier = 500) => {
  const canvas = getCanvas()
  const valuesSize = values.length
  const columns: Column[] = []
  const spacing = (canvas.width - MARGIN * 2) / valuesSize

  for (let i = 0; i < valuesSize; i++) {
    const xAxis = i * spacing + spacing / 2 + MARGIN
    const yAxis = canvas.height - MARGIN - i * 3
    const columnHeight = columnHeightMultiplier * values[i]

    // TODO try to use value instead of height, i redukcja value żeby zmniejszała się wysokość podczas animacji
    columns[i] = Column({
      x: xAxis,
      y: yAxis,
      width: spacing - 4,
      height: columnHeight
    })
  }

  return columns
}
