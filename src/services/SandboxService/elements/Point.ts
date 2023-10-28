import { getContext } from '@/services/SandboxService/sandbox.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'
import type { Connection } from '@/services/SandboxService/elements/Connection'

export const DEFAULT_COLOR: ColorRGBA = { r: 255, g: 165, b: 0 }

export const Point = ({ x, y, value, color }: PointConfig): Point => {
  const point: Point = {
    x,
    y,
    value: value ?? 0,
    color: color ?? DEFAULT_COLOR,
    queue: [],
    connections: [],
    draw,
    changeColor
  }

  return point

  function changeColor(color: ColorRGBA, frameCount = 15) {
    const { r: basicR, g: basicG, b: basicB } = point.color
    const { r: targetR, g: targetG, b: targetB } = color
    const rStep = (targetR - basicR) / frameCount
    const gStep = (targetG - basicG) / frameCount
    const bStep = (targetB - basicB) / frameCount

    for (let i = 0; i <= frameCount; i++) {
      const r = basicR + rStep * i
      const g = basicG + gStep * i
      const b = basicB + bStep * i
      point.queue.push({ color: { r, g, b } })
    }
  }

  function draw(size = 8) {
    const context = getContext()
    const radius = size / 2

    let isChanged = false

    if (point.queue.length > 0) {
      const { color } = point.queue.shift()!
      point.color = color ?? point.color
      isChanged = true
    }

    context.beginPath()
    context.fillStyle = colors.rgbToHex(point.color)
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()

    return isChanged
  }
}

type PointConfig = {
  x: number
  y: number
  value?: number
  color?: ColorRGBA
}

export type Point = PointConfig & {
  queue: Partial<PointConfig>[]
  color: ColorRGBA
  connections: Connection[]
  draw: (size?: number) => boolean
  changeColor: (color: ColorRGBA, frameCount?: number) => void
}
