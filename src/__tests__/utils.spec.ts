import { lerp, getRandomValueFromGivenArray } from '../utils'

describe('Utils', () => {
  test('should calculate linear interpolation', () => {
    const result = lerp(1, 4, 1 / 20)

    expect(result).toBe(1.15)
  })

  test('should return undefined for an empty array', () => {
    const result = getRandomValueFromGivenArray([])
    expect(result).toBeUndefined()
  })

  test('should return the only element for an array with one element', () => {
    const result = getRandomValueFromGivenArray([42])
    expect(result).toBe(42)
  })

  test('should return a value within the array', () => {
    const values = [1, 2, 3, 4, 5]
    const result = getRandomValueFromGivenArray(values)
    expect(values).toContain(result)
  })
})
