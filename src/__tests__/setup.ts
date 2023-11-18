import * as SandboxService from '../services/Sandbox/sandbox.service'
import * as Column from '../services/Sandbox/elements/Column'
import { Noop } from '../types'
import clearAllMocks = jest.clearAllMocks

jest.mock('delaunator')

beforeEach(() => {
  const initAnimation = jest.spyOn(SandboxService, 'initAnimation')

  initAnimation.mockImplementationOnce((animation: Noop) => {
    animation()
    return 1
  })

  const currentTestName = expect.getState().currentTestName

  if (!currentTestName.includes('Column')) {
    jest.spyOn(Column, 'Column').mockImplementation((columnConfig: Column.ColumnConfig) => {
      return {
        color: columnConfig?.color ?? Column.DEFAULT_COLOR,
        x: columnConfig.x,
        y: columnConfig.y,
        width: columnConfig.width,
        height: columnConfig.height,
        draw: jest.fn(),
        queue: [],
        moveTo: jest.fn(),
        jump: jest.fn(),
        collapse: jest.fn(),
        changeColor: jest.fn()
      }
    })
  }

  const container = document.createElement('div')
  container.id = 'main-container'

  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 400
  canvas.id = 'sandbox'

  container.appendChild(canvas)
  document.body.appendChild(container)
})

afterEach(() => {
  clearAllMocks()
})
