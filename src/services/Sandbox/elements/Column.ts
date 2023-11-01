import { lerp, RGBColors } from '@/utils'
import { getContext } from '@/services/Sandbox/sandbox.service'
import type { MoveToAnimationConfig, AnimationConfig } from '@/services/Animation/animation.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'
import {
  getAnimationConfig,
  getMoveToAnimationConfig
} from '@/services/Animation/animation.service'

export const DEFAULT_COLOR = RGBColors.pink
export const COLLAPSED_COLUMN_HEIGHT = 2

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

  function moveTo(
    location: Pick<ColumnConfig, 'x' | 'y'>,
    config?: Partial<MoveToAnimationConfig>
  ) {
    const { keepColor, frameCount, yOffset } = getMoveToAnimationConfig(config)

    changeColor(RGBColors.green)

    for (let i = 0; i <= frameCount; i++) {
      const tickRate = i / frameCount
      const u = Math.sin(tickRate * Math.PI)

      column.queue.push({
        x: lerp(column.x, location.x, tickRate),
        y: lerp(column.y, location.y, tickRate) + ((u * column.width) / 2) * yOffset
      })
    }

    if (!keepColor) changeColor(DEFAULT_COLOR)
  }

  function jump(config?: Partial<AnimationConfig>) {
    const { keepColor, frameCount } = getAnimationConfig(config)
    const color = RGBColors.warning
    const baseY = column.y

    if (color && color !== column.color) {
      changeColor(color)
    }

    for (let i = 0; i <= frameCount; i++) {
      const tickRate = i / frameCount
      const u = Math.sin(tickRate * Math.PI)
      const y = i === frameCount ? baseY : column.y - u * column.width

      column.queue.push({
        x: column.x,
        y
      })
    }

    if (!keepColor) changeColor(DEFAULT_COLOR)
  }

  function changeColor(color: ColorRGBA, frameCount = 5) {
    const { r: basicR, g: basicG, b: basicB } = column.color
    const { r: targetR, g: targetG, b: targetB } = color
    const rStep = (targetR - basicR) / frameCount
    const gStep = (targetG - basicG) / frameCount
    const bStep = (targetB - basicB) / frameCount

    for (let i = 0; i <= frameCount; i++) {
      const r = basicR + rStep * i
      const g = basicG + gStep * i
      const b = basicB + bStep * i

      column.queue.push({ color: { r, g, b } })
    }
  }

  function collapse(config?: Partial<AnimationConfig>) {
    const { frameCount } = getAnimationConfig(config)

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
    context.fillStyle = colors.rgbToHex(color)
    context.moveTo(left, top)
    context.lineTo(left, y)
    context.ellipse(x, y, width / 2, width / 4, 0, Math.PI, Math.PI * 2, true)
    context.lineTo(right, top)
    context.ellipse(x, top, width / 2, width / 4, 0, 0, Math.PI * 2, true)
    context.fill()
    context.stroke()

    return isChanged
  }
}

export type Column = ColumnConfig & {
  queue: Partial<ColumnConfig>[]
  color: ColorRGBA
  draw: () => boolean
  moveTo: (location: Pick<ColumnConfig, 'x' | 'y'>, config?: Partial<MoveToAnimationConfig>) => void
  jump: (config?: Partial<AnimationConfig>) => void
  collapse: (config?: Partial<AnimationConfig>) => void
  changeColor: (color: ColorRGBA, frameCount?: number) => void
}

export type ColumnConfig = {
  x: number
  y: number
  width: number
  height: number
  color?: ColorRGBA
}
