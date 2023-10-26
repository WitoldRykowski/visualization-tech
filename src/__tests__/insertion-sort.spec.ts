import {
  initInsertionSort,
  visualizeInsertionSort,
  __testing
} from '../services/insertion-sort.service'
import { generateRandomColumn, isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/SandboxService/sandbox.service'
import * as ArrayService from '../services/ArrayService/array.service'

describe('Insertion Sort', () => {
  test('should initialize algorithm sandbox', () => {
    initInsertionSort()
    const { values, columns, moves, animateInsertionSort } = __testing()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(expect.anything(), animateInsertionSort)
  })

  test('should start visualizing algorithm', () => {
    initInsertionSort()
    visualizeInsertionSort()
    const { moves, values } = __testing()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every step correctly', () => {
    const renderArray = jest.spyOn(ArrayService, 'renderArray')

    renderArray.mockImplementation((values: number[]) => {
      return values.map((value) => generateRandomColumn({ height: 10 * value }))
    })

    initInsertionSort()
    visualizeInsertionSort()

    const { moves, columns, animateInsertionSort } = __testing()
    let movesLength = moves.length

    while (movesLength > 0) {
      const move = moves[0]
      const [i, j] = move.indexes

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

    expect(__testing().moves.length).toBe(0)
  })
})
