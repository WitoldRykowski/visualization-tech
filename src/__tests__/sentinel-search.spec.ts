import { __testing } from '../services/sentinel-search.service'
import { getSandboxSize, initAnimation } from '../services/Sandbox/sandbox.service'
import { isArraySortedAscending } from '../utils/testUtils'
import { RGBColors } from '../utils'
import { COLUMN_HEIGHT_MULTIPLIER } from '../services/Sandbox/elements/Row'

describe('Sentinel Search', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, animateSentinelSearch, initSentinelSearch } = __testing

    initSentinelSearch()

    const { moves, columns, values } = getState()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isArraySortedAscending(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(animateSentinelSearch)
  })

  test('should start visualizing algorithm', () => {
    const { getState, visualizeSentinelSearch, initSentinelSearch } = __testing

    initSentinelSearch()
    visualizeSentinelSearch()

    const { moves, values } = getState()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every move correctly', () => {
    const { getState, animateSentinelSearch } = __testing

    const { moves, columns } = getState()
    const lastIndex = columns.length - 1
    let movesLength = moves.length

    while (movesLength > 0) {
      const { values, columns, moves } = getState()
      const move = moves[0]
      const { height } = getSandboxSize()
      animateSentinelSearch()

      if (move.animation === 'jump') {
        expect(columns[move.i].jump).toHaveBeenCalledTimes(1)
      } else if (move.animation === 'changeColor') {
        expect(columns[move.i].changeColor).toHaveBeenCalledTimes(1)
      } else if (move.animation === 'replace-last') {
        expect(columns[lastIndex].changeColor).toHaveBeenCalledTimes(1)
        expect(columns[lastIndex].changeHeight).toHaveBeenCalledTimes(1)
        expect(columns[lastIndex].changeHeight).toHaveBeenCalledWith(
          Math.ceil(height * 0.75 * move.target)
        )
      } else if (move.animation === 'restore') {
        expect(columns[lastIndex].changeHeight).toHaveBeenCalledTimes(1)
        expect(columns[lastIndex].changeColor).toHaveBeenCalledTimes(1)
        expect(columns[lastIndex].changeHeight).toHaveBeenCalledWith(
          Math.ceil(height * 0.75 * values[lastIndex])
        )
      }

      jest.clearAllMocks()

      movesLength--
    }

    expect(moves.length).toBe(0)
  })
})
