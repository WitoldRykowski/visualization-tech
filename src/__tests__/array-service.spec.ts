import { generateNonSortedArray, generateSortedArray } from '../services/ArrayService/array.service'
import { isArraySortedAscending } from '../utils/testUtils'

describe('Array Service', () => {
  test('should generate sorted array', () => {
    const values = generateSortedArray()

    expect(values.length).toBe(40)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should generate not sorted array', () => {
    const values = generateNonSortedArray()

    expect(values).not.toEqual([...values].sort())
  })
})
