import { Connection } from '../services/Sandbox/elements/Connection'
import { Point } from '../services/Sandbox/elements/Point'
import { getContext } from '../services/Sandbox/sandbox.service'

const setup = () => {
  const connection = Connection({
    startAt: Point({ x: 10, y: 10, id: 1 }),
    finishAt: Point({ x: 20, y: 20, id: 2 })
  })

  connection.draw()

  return { connection }
}

describe('Connection', () => {
  test('should draw Connection', () => {
    const { connection } = setup()
    const context = getContext()

    expect(context.beginPath).toHaveBeenCalledTimes(1)
    expect(context.moveTo).toHaveBeenCalledTimes(1)
    expect(context.moveTo).toHaveBeenCalledWith(10, 10)
    expect(context.lineTo).toHaveBeenCalledTimes(1)
    expect(context.lineTo).toHaveBeenCalledWith(20, 20)
    expect(context.stroke).toHaveBeenCalledTimes(1)
    expect(Math.floor(connection.weight)).toBe(14)
  })

  test('should fill queue with frames for Connection', () => {
    const { connection } = setup()

    connection.changeColor({ r: 255, g: 0, b: 0 })

    expect(connection.queue).toHaveLength(2)
    expect(connection.queue).toContainEqual({ color: { r: 255, g: 0, b: 0 } })
  })

  test('should update Connection on frame dequeue', () => {
    const { connection } = setup()

    connection.changeColor({ r: 255, g: 0, b: 0 })

    expect(connection.draw()).toBe(true)
    expect(connection.queue).toHaveLength(1)
  })
})
