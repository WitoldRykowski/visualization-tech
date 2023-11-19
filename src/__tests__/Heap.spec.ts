import { Heap } from '../services/Sandbox/elements/Heap'
import { generateNonSortedArray } from '../services/Array/array.service'

const setup = () => {
  const values = generateNonSortedArray(10)
  const heap = Heap(values)

  return { heap, values }
}

describe('Heap', () => {
  test('should create a Heap', () => {
    const { heap, values } = setup()

    expect(heap.points).toHaveLength(values.length)

    heap.points.forEach((point, index) => {
      expect(point.value).toBe(values[index])
    })

    const ids: Set<number> = new Set(heap.points.map(({ id }) => id))

    expect(ids.size).toBe(heap.points.length)
  })

  test('should get point connections in Heap', () => {
    const { heap } = setup()

    const connections = heap.getPointConnections(heap.points[0])
    expect(connections).toHaveLength(2)
    expect(connections[0].finishAt.id).toBe(heap.points[1].id)
    expect(connections[1].finishAt.id).toBe(heap.points[2].id)
  })

  test('should find point parent in Heap', () => {
    const { heap } = setup()
    const parent = heap.getPointParent(heap.points[1])

    expect(parent.id).toBe(heap.points[0].id)
  })
})
