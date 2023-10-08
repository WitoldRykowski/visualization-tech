import { lerp } from '@/utils'
import { getContext } from '@/services/SandboxService/sandbox.service'
import type {
  MoveToAnimationConfig,
  AnimationConfig
} from '@/services/AnimationService/animation.service'
import { colors } from 'quasar'
import {
  getAnimationConfig,
  getMoveToAnimationConfig
} from '@/services/AnimationService/animation.service'

export const DEFAULT_COLOR = colors.getPaletteColor('primary')

export const Column = (columnConfig: ColumnConfig): Column => {
  const column: Column = {
    ...columnConfig,
    color: DEFAULT_COLOR,
    queue: [],
    draw,
    moveTo,
    jump,
    collapse,
    changeColor
  }

  draw()

  return column

  function moveTo(location: Pick<ColumnConfig, 'x' | 'y'>, config = getMoveToAnimationConfig()) {
    const { keepColor, frameCount, yOffset } = config

    for (let i = 0; i <= frameCount; i++) {
      const tickRate = i / frameCount
      const u = Math.sin(tickRate * Math.PI)
      const color = getColor({
        color: colors.getPaletteColor('positive'),
        isLastFrame: i === frameCount,
        keepColor
      })

      column.queue.push({
        x: lerp(column.x, location.x, tickRate),
        y: lerp(column.y, location.y, tickRate) + ((u * column.width) / 2) * yOffset,
        color
      })
    }
  }

  function jump(config = getAnimationConfig()) {
    const { keepColor, frameCount } = config

    for (let i = 0; i <= frameCount; i++) {
      const tickRate = i / frameCount
      const u = Math.sin(tickRate * Math.PI)
      const color = getColor({
        color: colors.getPaletteColor('warning'),
        isLastFrame: i === frameCount,
        keepColor
      })

      column.queue.push({
        x: column.x,
        y: column.y - u * column.width,
        color
      })
    }
  }

  function changeColor(color: string) {
    column.queue.push({
      color
    })
  }

  function collapse(config = getAnimationConfig()) {
    const { frameCount } = config
    const COLLAPSED_COLUMN_HEIGHT = 2

    for (let i = 0; i <= frameCount; i++) {
      const tickRate = i / frameCount
      const u = column.height - column.height * tickRate
      const height = u > COLLAPSED_COLUMN_HEIGHT ? u : COLLAPSED_COLUMN_HEIGHT

      column.queue.push({
        height
      })
    }
  }

  function draw() {
    let isChanged = false

    if (column.queue.length > 0) {
      const { x, y, height, color } = column.queue.shift()!

      column.x = x ?? column.x
      column.y = y ?? column.y
      column.height = height ?? column.height
      column.color = color ?? column.color
      isChanged = true
    }

    const context = getContext()
    const { x, y, width, height, color } = column

    const left = x - width / 2
    const top = y - height
    const right = x + width / 2

    context.beginPath()
    context.fillStyle = color
    context.moveTo(left, top)
    context.lineTo(left, y)
    context.ellipse(x, y, width / 2, width / 4, 0, Math.PI, Math.PI * 2, true)
    context.lineTo(right, top)
    context.ellipse(x, top, width / 2, width / 4, 0, 0, Math.PI * 2, true)
    context.fill()
    context.stroke()

    return isChanged
  }

  function getColor(payload: GetColorPayload) {
    const { color, isLastFrame, keepColor } = payload

    if (isLastFrame && !keepColor) return DEFAULT_COLOR

    return color
  }
}

export type MoveAnimation = 'swap' | 'jump' | 'collapse' | 'changeColor' | 'move'

export type Column = ColumnConfig & {
  queue: Partial<ColumnConfig>[]
  color: string
  draw: () => boolean
  moveTo: (location: Pick<ColumnConfig, 'x' | 'y'>, config?: MoveToAnimationConfig) => void
  jump: (config?: AnimationConfig) => void
  collapse: (config?: AnimationConfig) => void
  changeColor: (color: string) => void
}

type GetColorPayload = {
  color: string
  isLastFrame: boolean
  keepColor: boolean
}

type ColumnConfig = {
  x: number
  y: number
  width: number
  height: number
  color?: string
}
