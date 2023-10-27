import { __testing, COLLAPSE_DELAY } from '../services/binary-search.service'
import { generateRandomColumn, isArraySortedAscending } from '../utils/testUtils'
import { initAnimation } from '../services/SandboxService/sandbox.service'
import * as ArrayService from '../services/ArrayService/array.service'
import { COLLAPSED_COLUMN_HEIGHT } from '../services/SandboxService/elements/Column'

const setup = () => {
  const { initBinarySearch, visualizeBinarySearch } = __testing()

  initBinarySearch()

  const renderArray = jest.spyOn(ArrayService, 'renderArray')

  renderArray.mockImplementation((values: number[]) => {
    return values.map((value) => generateRandomColumn({ height: 10 * value }))
  })

  visualizeBinarySearch()

  return { renderArray }
}

describe('Binary Search', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, animateBinarySearch, initBinarySearch } = __testing()

    initBinarySearch()

    const { values, columns, moves } = getState()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isArraySortedAscending(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(expect.anything(), animateBinarySearch)
  })

  test('should start visualizing algorithm', () => {
    const { renderArray } = setup()
    const { getState } = __testing()
    const { values, moves } = getState()

    expect(renderArray).toHaveBeenCalledTimes(1)
    expect(renderArray).toHaveBeenCalledWith(values)
    expect(moves.length).toBeGreaterThan(0)
  })

  test('should visualize every step correctly', () => {
    setup()
    const { getState, animateBinarySearch } = __testing()
    let movesLength = getState().moves.length

    while (movesLength > 0) {
      const { values, columns, moves } = getState()
      const { animation, guess, target, min, max } = moves[0]

      animateBinarySearch()

      if (animation === 'jump') {
        expect(columns[guess].jump).toHaveBeenCalledTimes(1)
        expect(columns[guess].jump).toHaveBeenCalledWith({ keepColor: true })

        if (values[guess] === target) {
          expect(columns[guess].changeColor).toHaveBeenCalledTimes(1)
        }
      } else if (animation === 'collapse') {
        for (let i = 0; i < min; i++) {
          if (columns[i].height > COLLAPSED_COLUMN_HEIGHT) {
            expect(columns[i].collapse).toHaveBeenCalledTimes(1)
            expect(columns[i].collapse).toHaveBeenCalledWith({ frameCount: COLLAPSE_DELAY })
          }
        }

        for (let i = max + 1; i < columns.length; i++) {
          if (columns[i].height > COLLAPSED_COLUMN_HEIGHT) {
            expect(columns[i].collapse).toHaveBeenCalledTimes(1)
            expect(columns[i].collapse).toHaveBeenCalledWith({ frameCount: COLLAPSE_DELAY })
          }
        }

        if (values[guess] !== target) {
          expect(columns[guess].changeColor).toHaveBeenCalledTimes(1)
        }
      }

      jest.clearAllMocks()

      movesLength--
    }

    expect(getState().moves.length).toBe(0)
  })
})
