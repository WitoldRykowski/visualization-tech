import { Point } from '../services/Sandbox/elements/Point'
import { getContext } from '../services/Sandbox/sandbox.service'

const POINT_SIZE = 10

const createPoint = () => Point({ x: 10, y: 10, id: 1, value: 20 })

type Config = {
  isPulsing: boolean
}

const setup = ({ isPulsing }: Config) => {
  const point = createPoint()
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
})
