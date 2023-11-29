import { Point } from '../services/Sandbox/elements/Point'
import { getContext } from '../services/Sandbox/sandbox.service'

const POINT_SIZE = 10

type Config = {
  isPulsing: boolean
}

const setup = ({ isPulsing }: Config) => {
  const point = Point({ x: 10, y: 10, id: 1, value: 20 })
  const context = getContext()

  point.isPulsing = isPulsing
  point.draw(POINT_SIZE)

  return { point, context }
}

describe('Point', () => {
  test('should draw Point', () => {
    const { context } = setup({ isPulsing: false })

    expect(context.arc).toHaveBeenCalledTimes(1)
    expect(context.arc).toHaveBeenCalledWith(10, 10, POINT_SIZE / 2, 0, Math.PI * 2)
    expect(context.beginPath).toHaveBeenCalledTimes(1)
    expect(context.closePath).toHaveBeenCalledTimes(1)
    expect(context.fill).toHaveBeenCalledTimes(1)
    expect(context.fillText).toHaveBeenCalledTimes(1)
    expect(context.fillText).toHaveBeenCalledWith('20', 10, 15)
  })

  test('should draw pulsing Point', () => {
    const { point, context } = setup({ isPulsing: true })

    expect(context.arc).toHaveBeenCalledTimes(2)
    expect(context.arc).toHaveBeenLastCalledWith(10, 10, POINT_SIZE / 2 + 0.1, 0, Math.PI * 2)
    expect(context.beginPath).toHaveBeenCalledTimes(2)
    expect(context.stroke).toHaveBeenCalledTimes(1)
    expect(point.pulseRadius).toBe(0.1)

    while (point.pulseRadius < 8) {
      point.draw(POINT_SIZE)
    }

    // Call draw one more time, so pulse radius should reset
    point.draw(POINT_SIZE)

    expect(point.pulseRadius).toBe(0.1)
  })

  test('should ensure Point render with spacing', () => {
    const { point } = setup({ isPulsing: false })

    expect(point.validatePoint({ x: 0, y: 0 })).toBe(false)
    expect(point.validatePoint({ x: 5, y: 20 })).toBe(false)
    expect(point.validatePoint({ x: 20, y: 5 })).toBe(false)
    expect(point.validatePoint({ x: 50, y: 50 })).toBe(true)
  })

  test('should fill queue with frames for Point', () => {
    const { point } = setup({ isPulsing: false })

    point.changeColor({ r: 255, g: 0, b: 0 })

    expect(point.queue).toContainEqual({ color: { r: 255, g: 0, b: 0 } })
    expect(point.queue).toHaveLength(2)
  })

  test('should fill queue with frames for Point', () => {
    const { point } = setup({ isPulsing: false })

    point.moveTo({ x: 20, y: 20 })

    expect(point.queue).toHaveLength(11)

    point.queue.forEach((frame, index) => {
      expect(frame.x).toBe(10 + index)
      expect(frame.y).toBe(10 + index)
    })
  })

  test('should update point on frame dequeue', () => {
    const { point } = setup({ isPulsing: false })
    point.moveTo({ x: 20, y: 20 })

    expect(point.draw(POINT_SIZE)).toBe(true)
    point.draw(POINT_SIZE)

    expect(point.queue).toHaveLength(9)
    expect(point.x).toBe(11)
    expect(point.y).toBe(11)
  })
})
