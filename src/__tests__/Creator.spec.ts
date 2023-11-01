import { renderArray } from '../services/Sandbox/Creator'
import { Column } from '../services/Sandbox/elements/Column'

describe('Renderer', () => {
  // ATTENTION!
  // The "renderArray" in test description is important
  // because of a condition in Jest's setup file that is based on the test name

  test('should renderArray', () => {
    const values = [1, 2, 3, 4, 5]
    const columns = renderArray(values)

    expect(columns.length).toBe(values.length)
    expect(Column).toHaveBeenCalledTimes(5)

    columns.forEach((column) => {
      expect(column.draw).toBeTruthy()
    })
  })
})
