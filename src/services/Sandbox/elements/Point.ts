import { getContext, getSandboxSize } from '@/services/Sandbox/sandbox.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'
import { DEFAULT_COLOR as connectionColor } from '@/services/Sandbox/elements/Connection'
import { lerp, RGBColors } from '@/utils'

export const DEFAULT_COLOR = connectionColor

export const Point = ({ x, y, color, value, id }: PointConfig): Point => {
  const point: Point = {
    id,
    x,
    y,
    value: value ?? null,
    size: 10,
    pulseRadius: 0,
    isPulsing: false,
    color: color ?? DEFAULT_COLOR,
    queue: [],
    draw,
    moveTo,
    changeColor,
    validatePoint
  }

  return point

  function changeColor(color: ColorRGBA, frameCount = 1) {
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

  function pulse(size: number) {
    point.isPulsing = true
    const MAX_PULSE_RADIUS = 8

    if (point.pulseRadius >= MAX_PULSE_RADIUS) {
      point.pulseRadius = 0
    }

    point.pulseRadius += calculateSpeed()

    function calculateSpeed() {
      const radius = size / 2

      const minSpeed = 0.1
      const maxSpeed = 0.2
      const rangeFactor = (radius + point.pulseRadius) / MAX_PULSE_RADIUS + radius

      const speed = minSpeed + (maxSpeed - minSpeed) * (1 - rangeFactor)

      return Math.max(speed, minSpeed)
    }
  }

  function validatePoint({ x, y }: Pick<Point, 'x' | 'y'>) {
    const { width, height } = getSandboxSize()
    const MARGIN = point.size * 2 + 5

    if (x < MARGIN || x > width - MARGIN || y < MARGIN || y > height - MARGIN) {
      return false
    }

    return calculateDistance(point, { x, y }) >= MARGIN

    function calculateDistance(pointA: Point, pointB: Pick<Point, 'x' | 'y'>) {
      return Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2)
    }
  }

  function moveTo(location: Pick<Point, 'x' | 'y'>, frameCount = 10) {
    for (let i = 0; i <= frameCount; i++) {
      const tickRate = i / frameCount

      point.queue.push({
        x: lerp(point.x, location.x, tickRate),
        y: lerp(point.y, location.y, tickRate)
      })
    }
  }

  function draw(size = point.size) {
    let isChanged = false
    point.size = size

    if (point.queue.length > 0) {
      const { color, x, y } = point.queue.shift()!
      point.color = color ?? point.color
      point.x = x ?? point.x
      point.y = y ?? point.y

      isChanged = true
    }

    const context = getContext()
    const radius = point.size / 2
    context.beginPath()
    context.fillStyle = colors.rgbToHex(point.color)
    context.arc(point.x, point.y, radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()

    if (point.value !== null) {
      context.fillStyle = colors.rgbToHex(RGBColors.grey)
      context.textAlign = 'center'
      context.font = `15px Arial`
      context.fillText(`${point.value}`, point.x, point.y + 5)
    }

    if (point.isPulsing) {
      pulse(point.size)

      context.beginPath()
      context.strokeStyle = colors.rgbToHex(point.color)
      context.arc(point.x, point.y, radius + point.pulseRadius, 0, Math.PI * 2)
      context.stroke()
    }

    return isChanged
  }
}

type PointConfig = Pick<Point, 'x' | 'y' | 'id'> & {
  color?: ColorRGBA
  value?: number
}

export type Point = {
  id: number
  x: number
  y: number
  queue: Partial<PointConfig & { pulseRadius: number }>[]
  color: ColorRGBA
  pulseRadius: number
  value: number | null
  size: number
  isPulsing: boolean
  draw: (size?: number) => boolean
  changeColor: (color: ColorRGBA, frameCount?: number) => void
  moveTo: (location: Pick<Point, 'x' | 'y'>, frameCount?: number) => void
  validatePoint: (payload: Pick<Point, 'x' | 'y'>) => boolean
}

export type MoveAnimation = 'swap' | 'changeColor' | 'move' | 'touch'
