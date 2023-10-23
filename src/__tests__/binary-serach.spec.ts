import {
  initBinarySearch,
  visualizeBinarySearch,
  __testing,
  type CollapseMoveConfig
} from '../services/binary-search.service'
import { generateRandomColumn, isArraySortedAscending } from '../utils/testUtils'
import { stopAnimation, animate } from '../services/SandboxService/sandbox.service'
import * as ArrayService from '../services/ArrayService/array.service'

const setup = () => {
  initBinarySearch()

  const renderArray = jest.spyOn(ArrayService, 'renderArray')

  renderArray.mockImplementation((values: number[]) => {
    return values.map((value) => generateRandomColumn({ height: 10 * value }))
  })

  visualizeBinarySearch()

  return { renderArray }
}

describe('Binary Search', () => {
  test('should initialize binary search sandbox', () => {
    initBinarySearch()

    const { values, columns, moves } = __testing()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isArraySortedAscending(values)).toBe(true)
    expect(animate).toHaveBeenCalledTimes(1)
    expect(stopAnimation).toHaveBeenCalledTimes(1)
  })

  test('should start visualizing binary search', () => {
    const { renderArray } = setup()
    const { values, moves } = __testing()

    expect(renderArray).toHaveBeenCalledTimes(1)
    expect(renderArray).toHaveBeenCalledWith(values)
    expect(moves.length).toBeGreaterThan(0)
  })

  test('should visualize every step correctly', () => {
    setup()
    const { moves, animateBinarySearch } = __testing()
    let movesLength = moves.length

    while (movesLength > 0) {
      const { moves, columns, values } = __testing()
      const move = moves[0]
      const { animation, guess, target } = move

      animateBinarySearch()

      if (animation === 'jump') {
        expect(columns[guess].jump).toHaveBeenCalledTimes(1)
        expect(columns[guess].jump).toHaveBeenCalledWith({ keepColor: true })

        if (values[guess] === target) {
          expect(columns[guess].changeColor).toHaveBeenCalledTimes(1)
        }
      } else if (animation === 'collapse') {
        const { lastUpdatedValue, min, max } = move as CollapseMoveConfig

        // FIXME why 2 times?
        if (lastUpdatedValue === 'min' || lastUpdatedValue === 'both') {
          for (let i = 0; i < min; i++) {
            if (values[i] !== target) {
              expect(columns[i].collapse).toHaveBeenCalledTimes(1)
              expect(columns[i].collapse).toHaveBeenCalledWith({ frameCount: 15 })
            }
          }
        }

        if (lastUpdatedValue === 'max' || lastUpdatedValue === 'both') {
          for (let i = max + 1; i < columns.length; i++) {
            if (values[i] !== target) {
              expect(columns[i].collapse).toHaveBeenCalledTimes(1)
              expect(columns[i].collapse).toHaveBeenCalledWith({ frameCount: 15 })
            }
          }
        }

        if (values[guess] !== target) {
          expect(columns[guess].changeColor).toHaveBeenCalledTimes(1)
        }
      }

      movesLength--
    }
  })
})
