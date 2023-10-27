import { __testing } from '../services/selection-sort.service'
import { isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/SandboxService/sandbox.service'

describe('', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, initSelectionSort, animateSelectionSort } = __testing()

    initSelectionSort()

    const { values, columns, moves } = getState()
    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(expect.anything(), animateSelectionSort)
  })

  test('should start visualizing sandbox', () => {
    const { getState, initSelectionSort, visualizeSelectionSort } = __testing()

    initSelectionSort()
    visualizeSelectionSort()

    const { values, moves } = getState()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every step correctly', () => {
    const { getState, animateSelectionSort, initSelectionSort, visualizeSelectionSort } =
      __testing()

    initSelectionSort()
    visualizeSelectionSort()

    const { columns, moves } = getState()
    let movesLength = moves.length

    while (movesLength > 0) {
      const { moves } = getState()
      const { minIndex, lastMinIndex, animation, indexes } = moves[0]
      const [i, j] = indexes

      animateSelectionSort()

      if (animation === 'swap' && minIndex !== i) {
        expect(columns[minIndex].jump).toHaveBeenCalledTimes(1)
        expect(columns[i].jump).toHaveBeenCalledTimes(1)

        expect(columns[minIndex].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[i].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[minIndex].moveTo).toHaveBeenCalledWith(columns[i], {
          yOffset: -1,
          frameCount: 40
        })
        expect(columns[i].moveTo).toHaveBeenCalledWith(columns[minIndex], { frameCount: 40 })
      } else if (animation === 'changeColor') {
        if (lastMinIndex !== minIndex) {
          if (lastMinIndex === i && j !== -1) {
            expect(columns[i].changeColor).toHaveBeenCalledTimes(1)
          } else {
            expect(columns[lastMinIndex].changeColor).toHaveBeenCalledTimes(1)
          }
        }

        expect(columns[minIndex].changeColor).toHaveBeenCalledTimes(1)
      } else if (j !== -1) {
        expect(columns[j].jump).toHaveBeenCalledTimes(1)
      }

      jest.clearAllMocks()
      movesLength--
    }
  })
})
