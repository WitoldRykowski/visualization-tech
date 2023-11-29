import { __testing } from '../services/quick-sort.service'
import { isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/Sandbox/sandbox.service'
import { RGBColors } from '../utils'

describe('QuickSort', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, animateQuickSort, initQuickSort } = __testing()

    initQuickSort()

    const { values, columns, moves } = getState()
    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(animateQuickSort)
  })

  test('should start visualizing algorithm', () => {
    const { getState, initQuickSort, visualizeQuickSort } = __testing()

    initQuickSort()
    visualizeQuickSort()

    const { values, moves } = getState()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every step correctly', () => {
    const { getState, animateQuickSort, initQuickSort, visualizeQuickSort } = __testing()

    initQuickSort()
    visualizeQuickSort()
    const { columns, moves, values } = getState()

    let movesLength = moves.length

    while (movesLength > 0) {
      const { moves } = getState()
      const { pivotIndex, animation, indexes } = moves[0]
      const [i, j] = indexes

      animateQuickSort()

      if (animation.startsWith('changeColor')) {
        for (let i = 0; i < columns.length; i++) {
          expect(columns[i].changeColor).toHaveBeenCalled()
        }

        if (moves.length) {
          expect(columns[pivotIndex].changeColor).toHaveBeenCalled()
        }
      } else if (animation.startsWith('touch')) {
        expect(columns[i].changeColor).toHaveBeenCalled()

        if (i > 0) {
          expect(columns[i - 1].changeColor).toHaveBeenCalled()
        }

        if (!animation.endsWith('j')) return

        expect(columns[j].changeColor).toHaveBeenCalled()

        if (j < values.length - 1) {
          expect(columns[j + 1].changeColor).toHaveBeenCalled()
        }
      } else if (animation === 'swap') {
        if (i === j) return

        expect(columns[i].jump).toHaveBeenCalled()
        expect(columns[j].jump).toHaveBeenCalled()

        expect(columns[i].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[i].moveTo).toHaveBeenCalledWith(columns[j], { frameCount: 40, yOffset: -1 })
        expect(columns[j].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[j].moveTo).toHaveBeenCalledWith(columns[i], { frameCount: 40 })

        if (i === pivotIndex || j === pivotIndex) {
          expect(columns[pivotIndex].changeColor).toHaveBeenCalled()
        }
      }

      movesLength--
    }
  })
})
