import { Heap } from '../services/Sandbox/elements/Heap'
import { generateNonSortedArray } from '../services/Array/array.service'

describe('Heap', () => {
  test('should create a heap', () => {
    const values = generateNonSortedArray(50)

    const heap = Heap(values)

    expect(heap.points).toHaveLength(values.length)

    heap.points.forEach((point, index) => {
      expect(point.value).toBe(values[index])
    })
  })
})
