import { __testing } from '../services/heap-sort.service'
import { isNotSorted, isArraySortedAscending } from '../utils/testUtils'
import { initAnimation } from '../services/Sandbox/sandbox.service'

describe('Heapsort', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, animateHeapSort, initHeapSort } = __testing()

    initHeapSort()

    const { values, moves, columns, heap } = getState()
    expect(moves.length).toBe(0)
    expect(columns.length).toBe(0)
    expect(heap.points.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(animateHeapSort)
  })

  test('should start visualizing algorithm', () => {
    const { getState, initHeapSort, visualizeHeapSort } = __testing()

    initHeapSort()
    visualizeHeapSort()

    const { values, moves } = getState()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })
})
