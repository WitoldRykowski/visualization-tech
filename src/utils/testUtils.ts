import { Column, type ColumnConfig } from '@/services/SandboxService/elements/Column'

export function isArraySortedAscending(values: number[]) {
  for (let i = values.length - 1; i >= 1; i--) {
    if (values[i] < values[i - 1]) {
      return false
    }
  }
  return true
}

export const isNotSorted = (values: number[]) => {
  return values.some((value, index) => {
    if (index === values.length - 1) return true

    return value > values[index + 1]
  })
}

export const generateRandomColumn = (columnConfig?: Partial<ColumnConfig>) => {
  return Column({
    x: columnConfig?.x ?? 1,
    y: columnConfig?.y ?? 1,
    width: columnConfig?.width ?? 10,
    height: columnConfig?.height ?? 10
  })
}
