import { initGnomeSort, visualizeGnomeSort, __testing } from '../services/gnome-sort.service'
import { generateRandomColumn, isArraySortedAscending, isNotSorted } from '../utils/testUtils'
import { initAnimation } from '../services/SandboxService/sandbox.service'
import * as ArrayService from '../services/ArrayService/array.service'
import { convertNamedColorToRGB } from '../utils'
import { DEFAULT_COLOR } from '../services/ArrayService/Column'

describe('Gnome Sort', () => {
  test('should initialize algorithm sandbox', () => {
    initGnomeSort()
    const { values, columns, moves, animateGnomeSort } = __testing()

    expect(moves.length).toBe(0)
    expect(columns.length).toBe(values.length)
    expect(isNotSorted(values)).toBe(true)
    expect(initAnimation).toHaveBeenCalledTimes(1)
    expect(initAnimation).toHaveBeenCalledWith(expect.anything(), animateGnomeSort)
  })

  test('should start visualizing algorithm', () => {
    initGnomeSort()
    visualizeGnomeSort()
    const { moves, values } = __testing()

    expect(moves.length).toBeGreaterThan(0)
    expect(isArraySortedAscending(values)).toBe(true)
  })

  test('should visualize every step correctly', () => {
    const renderArray = jest.spyOn(ArrayService, 'renderArray')

    renderArray.mockImplementation((values: number[]) => {
      return values.map((value) => generateRandomColumn({ height: 10 * value }))
    })

    initGnomeSort()
    visualizeGnomeSort()

    const { moves, columns, animateGnomeSort } = __testing()
    let movesLength = moves.length

    while (movesLength > 0) {
      const move = moves[0]
      const { animation, left, right } = move

      animateGnomeSort()

      if (animation === 'touch') {
        const color = convertNamedColorToRGB('light-blue-5')
        if (left !== -1) {
          expect(columns[left].changeColor).toHaveBeenCalledWith(color)
        }

        expect(columns[right].changeColor).toHaveBeenCalledWith(color)
      } else if (animation === 'swap') {
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
  })
})
