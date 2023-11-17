import { __testing } from '../services/bubble-sort.service'
import { isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/Sandbox/sandbox.service'

const setup = () => {
  const { initBubbleSort, visualizeBubbleSort } = __testing

  initBubbleSort()
  visualizeBubbleSort()
}

describe('Bubble Sort', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, animateBubbleSort, initBubbleSort } = __testing

    initBubbleSort()

    const { moves, columns, values } = getState()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(animateBubbleSort)
  })

  test('should start visualizing algorithm', () => {
    const { getState, visualizeBubbleSort, initBubbleSort } = __testing

    initBubbleSort()
    visualizeBubbleSort()

    const { moves, values } = getState()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every move correctly', () => {
    setup()
    const { getState, animateBubbleSort } = __testing

    const { moves, columns } = getState()

    let movesLength = moves.length

    while (movesLength > 0) {
      const { animation, indexes } = moves[0]
      const [i, j] = indexes

      animateBubbleSort()

      if (animation === 'jump') {
        expect(columns[i].jump).toHaveBeenCalledTimes(1)
        expect(columns[j].jump).toHaveBeenCalledTimes(1)
      } else if (animation === 'swap') {
        expect(columns[i].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[j].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[i].moveTo).toHaveBeenCalledWith(columns[j], { yOffset: -1 })
        expect(columns[j].moveTo).toHaveBeenCalledWith(columns[i])
      }

      jest.clearAllMocks()

      movesLength--
    }

    expect(moves.length).toBe(0)
  })
})
