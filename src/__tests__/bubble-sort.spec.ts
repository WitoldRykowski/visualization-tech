import { initBubbleSort, visualizeBubbleSort, __testing } from '../services/bubble-sort.service'
import * as ArrayService from '../services/ArrayService/array.service'
import { generateRandomColumn, isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/SandboxService/sandbox.service'

const setup = () => {
  initBubbleSort()

  const renderArray = jest.spyOn(ArrayService, 'renderArray')

  renderArray.mockImplementation((values: number[]) => {
    return values.map((value) => generateRandomColumn({ height: 10 * value }))
  })

  visualizeBubbleSort()

  return { renderArray }
}

describe('Bubble Sort', () => {
  test('should initialize bubble sort sandbox', () => {
    initBubbleSort()

    const { values, columns, moves, animateBubbleSort } = __testing()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(expect.anything(), animateBubbleSort)
  })

  test('should start visualizing bubble sort', () => {
    initBubbleSort()
    visualizeBubbleSort()
    const { moves, values } = __testing()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every move correctly', () => {
    setup()
    const { moves, animateBubbleSort } = __testing()
    let movesLength = moves.length

    while (movesLength > 0) {
      const { moves, columns } = __testing()
      const move = moves[0]
      const { animation, indexes } = move
      const [i, j] = indexes

      animateBubbleSort()

      if (animation === 'jump') {
        expect(columns[i].jump).toHaveBeenCalledTimes(1)
        expect(columns[j].jump).toHaveBeenCalledTimes(1)
      } else if (animation === 'swap') {
        expect(columns[i].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[j].moveTo).toHaveBeenCalledTimes(1)
        // FIXME think about it ({ yOffset: -1 } should be in second check)
        expect(columns[i].moveTo).toHaveBeenCalledWith(columns[j], { yOffset: -1 })
        expect(columns[j].moveTo).toHaveBeenCalledWith(columns[i])
      }

      jest.clearAllMocks()

      movesLength--
    }
  })
})
