import { Column } from '../services/ArrayService/Column'

// ATTENTION!
// The "Column" in each test description is important
// because of a condition in Jest's setup file that is based on the test name

const generateColumn = () => Column({ x: 0, y: 0, width: 10, height: 100 })

describe('Column', () => {
  test('should move Column to correct location', () => {
    const column = generateColumn()

    column.moveTo({ x: 20, y: 20 })

    const moves = column.queue.filter((move) => {
      const keys = Object.keys(move)
      return keys.includes('x') || keys.includes('y')
    })

    expect(moves.at(-1)).toEqual(
      expect.objectContaining({
        x: 20,
        y: 20
      })
    )
  })

  test('should make Column jump', () => {
    const column = generateColumn()

    column.jump()

    const moves = column.queue.filter((move) => {
      const keys = Object.keys(move)
      return keys.includes('x') || keys.includes('y')
    })

    expect(moves.some(({ y }) => y === -10)).toBe(true)
    expect(moves.at(-1)).toEqual(
      expect.objectContaining({
        x: 0,
        y: 0
      })
    )
  })

  test('should collapse Column', () => {
    const column = generateColumn()

    column.collapse()

    expect(column.queue.at(-1)).toEqual({ height: 2 })
  })

  test('should draw Column', () => {
    const column = generateColumn()

    column.moveTo({ x: 20, y: 20 })

    // Draw all color moves
    while (Object.keys(column.queue[0]).includes('color')) {
      expect(column.draw()).toBe(true)
    }

    // Draw move which contains starting position
    expect(column.draw()).toBe(true)

    const queueLength = column.queue.length
    const move = column.queue[0]

    expect(column.draw()).toBe(true)
    expect(column.queue.length).toBe(queueLength - 1)
    expect(column.x).toBe(move.x)
    expect(column.y).toBe(move.y)

    // Draw all queued moves
    while (column.queue.length) {
      column.draw()
    }

    expect(column.draw()).toBe(false)
  })
})
