import { lerp, convertNamedColorToRGB } from '../utils'

describe('Utils', () => {
  test('should calculate linear interpolation', () => {
    const result = lerp(1, 4, 1 / 20)

    expect(result).toBe(1.15)
  })
})
