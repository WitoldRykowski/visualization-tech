import { __testing } from '../services/gnome-sort.service'
import { isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/Sandbox/sandbox.service'
import { DEFAULT_COLOR } from '../services/Sandbox/elements/Column'
import { RGBColors } from '../utils'

describe('Gnome Sort', () => {
  test('should initialize algorithm sandbox', () => {
    const { getState, animateGnomeSort, initGnomeSort } = __testing()

    initGnomeSort()

    const { values, columns, moves } = getState()
    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(animateGnomeSort)
  })

  test('should start visualizing algorithm', () => {
    const { getState, initGnomeSort, visualizeGnomeSort } = __testing()

    initGnomeSort()
    visualizeGnomeSort()

    const { values, moves } = getState()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every step correctly', () => {
    const { getState, animateGnomeSort, initGnomeSort, visualizeGnomeSort } = __testing()

    initGnomeSort()
    visualizeGnomeSort()
    const { columns, moves } = getState()

    let movesLength = moves.length

    while (movesLength > 0) {
      const { moves } = getState()
      const { animation, left, right } = moves[0]

      animateGnomeSort()

      if (animation === 'touch') {
        const color = RGBColors.lightBlue
        if (left !== -1) {
          expect(columns[left].changeColor).toHaveBeenCalledWith(color)
        }

        expect(columns[right].changeColor).toHaveBeenCalledWith(color)
      } else if (animation === 'swap') {
        expect(columns[left].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[right].moveTo).toHaveBeenCalledTimes(1)
        expect(columns[left].moveTo).toHaveBeenCalledWith(columns[right], { yOffset: -1 })
        expect(columns[right].moveTo).toHaveBeenCalledWith(columns[left])
      } else if (animation === 'jump') {
        expect(columns[right].jump).toHaveBeenCalledTimes(1)
      } else {
        for (let i = columns.length - 1; i >= 0; i--) {
          expect(columns[i].changeColor).toHaveBeenCalledWith(DEFAULT_COLOR)
        }
      }

      jest.clearAllMocks()

      movesLength--
    }

    expect(getState().moves.length).toBe(0)
  })
})
