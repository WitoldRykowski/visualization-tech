import { Column, type ColumnConfig } from '@/services/ArrayService/Column'

export function isArraySortedAscending(values: number[]) {
  for (let i = values.length - 1; i >= 1; i--) {
    if (values[i] < values[i - 1]) {
      return false
    }
  }
  return true
}

export const generateRandomColumn = (columnConfig?: Partial<ColumnConfig>) => {
  return Column({
    x: columnConfig?.x ?? 1,
    y: columnConfig?.y ?? 1,
    width: columnConfig?.width ?? 10,
    height: columnConfig?.height ?? 10
  })
}
