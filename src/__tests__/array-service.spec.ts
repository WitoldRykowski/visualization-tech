import {
  generateNonSortedArray,
  generateSortedArray,
  renderArray
} from '../services/ArrayService/array.service'
import { Column } from '../services/ArrayService/Column'

describe('Array Service', () => {
  test('should generate sorted array', () => {
    const values = generateSortedArray()

    expect(values.length).toBe(50)
    for (let i = values.length - 1; i >= 1; i--) {
      expect(values[i] > values[i - 1]).toBe(true)
    }
  })

  test('should generate not sorted array', () => {
    const values = generateNonSortedArray()

    expect(values).not.toEqual([...values].sort())
  })

  test('should render columns', () => {
    const values = [1, 2, 3, 4, 5]
    const columns = renderArray(values)

    expect(columns.length).toBe(values.length)
    expect(Column).toHaveBeenCalledTimes(5)

    columns.forEach((column) => {
      expect(column.draw).toBeTruthy()
    })
  })
})
