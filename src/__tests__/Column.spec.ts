import { COLLAPSED_COLUMN_HEIGHT, Column } from '../services/Sandbox/elements/Column'
import { getContext } from '../services/Sandbox/sandbox.service'

// ATTENTION!
// The "Column" in each test description is important
// because of a condition in Jest's setup file that is based on the test name

const setup = () => {
  const column = Column({ x: 0, y: 0, width: 10, height: 100 })
  const context = getContext()

  return { column, context }
}

describe('Column', () => {
  test('should draw Column', () => {
    const { context } = setup()

    expect(context.beginPath).toHaveBeenCalledTimes(1)
    expect(context.moveTo).toHaveBeenCalledTimes(1)
    expect(context.moveTo).toHaveBeenCalledWith(-5, -100)
    expect(context.lineTo).toHaveBeenCalledTimes(2)
    expect(context.lineTo).toHaveBeenNthCalledWith(1, ...[-5, 0])
    expect(context.lineTo).toHaveBeenNthCalledWith(2, ...[5, -100])
    expect(context.ellipse).toHaveBeenCalledTimes(2)
    expect(context.fill).toHaveBeenCalledTimes(1)
    expect(context.stroke).toHaveBeenCalledTimes(1)
  })

  test('should fill queue with frames for Point', () => {
    const { column } = setup()

    column.moveTo({ x: 20, y: 20 })

    expect(column.queue).toHaveLength(23)
    expect(column.queue).toContainEqual({ x: 20, y: 20 })
  })

  test('should fill queue with frames for Point', () => {
    const { column } = setup()

    column.changeColor({ r: 255, b: 0, g: 0 })
    expect(column.queue).toHaveLength(6)
    expect(column.queue).toContainEqual({ color: { r: 255, g: 0, b: 0 } })
  })

  test('should fill queue with height changes frames for Point', () => {
    const { column } = setup()

    column.changeHeight(COLLAPSED_COLUMN_HEIGHT)

    expect(column.queue).toHaveLength(21)
    expect(column.queue[column.queue.length - 1]).toEqual({ height: COLLAPSED_COLUMN_HEIGHT })

    column.changeHeight(100)
    expect(column.queue).toHaveLength(42)
    expect(column.queue[column.queue.length - 1]).toEqual({ height: 100 })
  })

  test('should fill queue with jump frames for Point', () => {
    const { column } = setup()

    column.jump()

    expect(column.queue).toHaveLength(23)
    expect(column.queue).toContainEqual({ x: 0, y: -10 })
  })

  test('should update Point on frame dequeue', () => {
    const { column } = setup()

    column.jump()

    while (column.queue[0]?.y !== -10) {
      column.draw()
    }

    expect(column.queue).toHaveLength(12)
  })
})
