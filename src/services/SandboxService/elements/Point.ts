import { getContext, getSandboxSize } from '@/services/SandboxService/sandbox.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'
import {
  type Connection,
  DEFAULT_COLOR as connectionColor
} from '@/services/SandboxService/elements/Connection'

export const DEFAULT_COLOR = connectionColor

export const Point = ({ x, y, color }: PointConfig): Point => {
  const point: Point = {
    x,
    y,
    pulseRadius: 0,
    isPulsing: false,
    color: color ?? DEFAULT_COLOR,
    queue: [],
    connections: [],
    draw,
    changeColor,
    validatePoint
  }

  return point

  function changeColor(color: ColorRGBA, frameCount = 2) {
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

  function pulse() {
    point.isPulsing = true

    if (point.pulseRadius >= 6) {
      point.pulseRadius = 0
    }

    if (point.pulseRadius >= 2) {
      point.pulseRadius += 0.05
    } else if (point.pulseRadius >= 4) {
      point.pulseRadius += 0.03
    } else {
      point.pulseRadius += 0.1
    }
  }

  function validatePoint({ x, y }: Pick<Point, 'x' | 'y'>) {
    const { width, height } = getSandboxSize()
    const MARGIN = 20

    if (x < MARGIN || x > width - MARGIN || y < MARGIN || y > height - MARGIN) {
      return false
    }

    return calculateDistance(point, { x, y }) >= MARGIN

    function calculateDistance(pointA: Point, pointB: Pick<Point, 'x' | 'y'>) {
      return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2)
    }
  }

  function draw(size = 8) {
    let isChanged = false

    if (point.queue.length > 0) {
      const { color } = point.queue.shift()!
      point.color = color ?? point.color

      isChanged = true
    }

    const context = getContext()
    const radius = size / 2
    context.beginPath()
    context.fillStyle = colors.rgbToHex(point.color)
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()

    if (point.isPulsing) {
      pulse()

      context.beginPath()
      context.strokeStyle = colors.rgbToHex(point.color)
      context.arc(x, y, radius + point.pulseRadius, 0, Math.PI * 2)
      context.stroke()
    }

    return isChanged
  }
}

type PointConfig = {
  x: number
  y: number
  color?: ColorRGBA
}

export type Point = PointConfig & {
  queue: Partial<PointConfig & { pulseRadius: number }>[]
  color: ColorRGBA
  pulseRadius: number
  isPulsing: boolean
  connections: Connection[]
  draw: (size?: number) => boolean
  changeColor: (color: ColorRGBA, frameCount?: number) => void
  validatePoint: (payload: Pick<Point, 'x' | 'y'>) => boolean
}
