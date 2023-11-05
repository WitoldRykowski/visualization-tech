import { getContext, getSandboxSize } from '@/services/Sandbox/sandbox.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'
import {
  type Connection,
  DEFAULT_COLOR as connectionColor
} from '@/services/Sandbox/elements/Connection'

export const DEFAULT_COLOR = connectionColor

export const Point = ({ x, y, color }: PointConfig): Point => {
  const point: Point = {
    x,
    y,
    size: 10,
    pulseRadius: 0,
    isPulsing: false,
    color: color ?? DEFAULT_COLOR,
    queue: [],
    connections: [],
    draw,
    changeColor,
    validatePoint,
    matchConnection,
    matchTwoWayConnection
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

  function matchConnection(destination: Point) {
    return point.connections.find((connection) => {
      const isXMatched = connection.finishAt.x === destination.x && connection.startAt.x === point.x
      const isYMatched = connection.finishAt.y === destination.y && connection.startAt.y === point.y

      return isXMatched && isYMatched
    })
  }

  function matchTwoWayConnection(destination: Point): Connection[] {
    const result = [matchConnection(destination), destination.matchConnection(point)]

    return result.filter((connection) => !!connection) as Connection[]
  }

  function draw(size = point.size) {
    let isChanged = false
    point.size = size

    if (point.queue.length > 0) {
      const { color } = point.queue.shift()!
      point.color = color ?? point.color

      isChanged = true
    }

    const context = getContext()
    const radius = point.size / 2
    context.beginPath()
    context.fillStyle = colors.rgbToHex(point.color)
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()

    if (point.isPulsing) {
      pulse(point.size)

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
  size: number
  isPulsing: boolean
  connections: Connection[]
  draw: (size?: number) => boolean
  changeColor: (color: ColorRGBA, frameCount?: number) => void
  validatePoint: (payload: Pick<Point, 'x' | 'y'>) => boolean
  matchConnection: (destination: Point) => Connection | undefined
  matchTwoWayConnection: (destination: Point) => Connection[]
}
