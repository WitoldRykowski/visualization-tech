import { getColumns } from '../services/Sandbox/Creator'
import { Column } from '../services/Sandbox/elements/Column'

describe('Renderer', () => {
  // ATTENTION!
  // The "getColumns" in test description is important
  // because of a condition in Jest's setup file that is based on the test name

  test('should getColumns', () => {
    const values = [1, 2, 3, 4, 5]
    const columns = getColumns(values)

    expect(columns.length).toBe(values.length)
    expect(Column).toHaveBeenCalledTimes(5)

    columns.forEach((column) => {
      expect(column.draw).toBeTruthy()
    })
  })
})
