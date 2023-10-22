import { DEFAULT_COLOR, type ColumnConfig } from '../services/ArrayService/Column'
import { Noop } from '../types'

const SANDBOX_SIZE = 400

jest.mock('../services/SandboxService/sandbox.service', () => {
  return {
    getSandboxSize: jest.fn(() => {
      return { width: SANDBOX_SIZE, height: SANDBOX_SIZE }
    }),
    stopAnimation: jest.fn(() => -1),
    animate: jest.fn((callback: Noop) => {
      callback()
      return 1
    }),
    getContext: jest.fn(() => {
      const canvas = document.createElement('canvas')
      canvas.width = SANDBOX_SIZE
      canvas.height = SANDBOX_SIZE

      return canvas.getContext('2d')
    }),
    initSandbox: jest.fn(() => {
      const container = document.createElement('div')
      container.id = 'main-container'

      const canvas = document.createElement('canvas')
      canvas.id = 'sandbox'
      canvas.width = SANDBOX_SIZE
      canvas.height = SANDBOX_SIZE

      container.appendChild(canvas)
      document.body.appendChild(container)
    })
  }
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
