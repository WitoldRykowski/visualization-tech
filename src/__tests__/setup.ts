import { DEFAULT_COLOR, type ColumnConfig } from '../services/ArrayService/Column'

beforeEach(() => {
  const container = document.createElement('div')
  container.id = 'main-container'

  const canvas = document.createElement('canvas')
  canvas.id = 'sandbox'
  canvas.width = 400
  canvas.height = 400

  container.appendChild(canvas)
  document.body.appendChild(container)
})

jest.mock('../services/ArrayService/Column', () => {
  return {
    Column: jest.fn((config: ColumnConfig) => ({
      color: config?.color ?? DEFAULT_COLOR,
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      draw: jest.fn(() => false),
      queue: [],
      moveTo: jest.fn((location, config) => ({
        location,
        config
      })),
      jump: jest.fn((config) => config),
      collapse: jest.fn((config) => config),
      changeColor: jest.fn((config) => config)
    }))
  }
})
