import { __testing } from '../services/insertion-sort.service'
import { isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/Sandbox/sandbox.service'

describe('Insertion Sort', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, animateInsertionSort, initInsertionSort } = __testing()
    initInsertionSort()

    const { values, columns, moves } = getState()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(expect.anything(), animateInsertionSort)
  })

  test('should start visualizing algorithm', () => {
    const { getState, initInsertionSort, visualizeInsertionSort } = __testing()
    initInsertionSort()
    visualizeInsertionSort()

    const { values, moves } = getState()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every step correctly', () => {
    const { getState, animateInsertionSort, initInsertionSort, visualizeInsertionSort } =
      __testing()

    initInsertionSort()
    visualizeInsertionSort()

    const { columns, moves } = getState()
    let movesLength = moves.length

    while (movesLength > 0) {
      const { moves } = getState()
      const [i, j] = moves[0].indexes

      animateInsertionSort()

      expect(columns[i].jump).toHaveBeenCalledTimes(1)
      expect(columns[j].jump).toHaveBeenCalledTimes(1)
      expect(columns[i].moveTo).toHaveBeenCalledWith(columns[j], { yOffset: -1 })
      expect(columns[j].moveTo).toHaveBeenCalledWith(columns[i])
      expect(columns[i].moveTo).toHaveBeenCalledTimes(1)
      expect(columns[j].moveTo).toHaveBeenCalledTimes(1)

      jest.clearAllMocks()
      movesLength--
    }

    expect(getState().moves.length).toBe(0)
  })
})
