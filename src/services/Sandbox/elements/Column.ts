import { lerp, RGBColors } from '@/utils'
import { getContext } from '@/services/Sandbox/sandbox.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'

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
    changeHeight,
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
        y: calculateY(tickRate, u)
      })
    }

    if (!keepColor) changeColor(DEFAULT_COLOR)

    function calculateY(tickRate: number, u: number) {
      const isYEqualLocationY = column.y === location.y

      if (isYEqualLocationY) return column.y

      return lerp(column.y, location.y, tickRate) + ((u * column.width) / 2) * yOffset
    }
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

  function changeHeight(height: number, config?: Partial<AnimationConfig>) {
    const { frameCount } = getAnimationConfig({ frameCount: 20, ...config })

    for (let i = 0; i <= frameCount; i++) {
      const tickRate = i / frameCount

      column.queue.push({
        height: getHeight(tickRate)
      })
    }

    function getHeight(tickRate: number) {
      if (height > column.height) return column.height + (height - column.height) * tickRate

      return column.height - (column.height - height) * tickRate
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
    context.strokeStyle = colors.rgbToHex(RGBColors.dark)
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

function getAnimationConfig(config?: Partial<AnimationConfig>): AnimationConfig {
  const DEFAULT_FRAME_COUNT = 10

  return {
    keepColor: !!config?.keepColor,
    frameCount: config?.frameCount ?? DEFAULT_FRAME_COUNT
  }
}

function getMoveToAnimationConfig(config?: Partial<MoveToAnimationConfig>): MoveToAnimationConfig {
  return {
    ...getAnimationConfig(config),
    yOffset: config?.yOffset ?? 1
  }
}

export type AnimationConfig = {
  keepColor: boolean
  frameCount: number
}

type MoveToAnimationConfig = AnimationConfig & { yOffset: number }

export type MoveAnimation = 'swap' | 'jump' | 'collapse' | 'changeColor' | 'move' | 'touch'

export type Column = {
  x: number
  y: number
  width: number
  height: number
  queue: Partial<ColumnConfig>[]
  color: ColorRGBA
  draw: () => boolean
  moveTo: (location: Pick<Column, 'x' | 'y'>, config?: Partial<MoveToAnimationConfig>) => void
  jump: (config?: Partial<AnimationConfig>) => void
  changeHeight: (height: number, config?: Partial<AnimationConfig>) => void
  changeColor: (color: ColorRGBA, frameCount?: number) => void
}

export type ColumnConfig = Pick<Column, 'x' | 'y' | 'width' | 'height'> & {
  color?: ColorRGBA
}
