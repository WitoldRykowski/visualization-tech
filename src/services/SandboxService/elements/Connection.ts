import type { Point } from '@/services/SandboxService/elements/Point'
import { getContext } from '@/services/SandboxService/sandbox.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'
import { convertNamedColorToRGB } from '@/utils'

export const DEFAULT_COLOR = convertNamedColorToRGB('primary')

export const Connection = ({ startAt, finishAt, color }: ConnectionPayload) => {
  const connection: Connection = {
    startAt,
    finishAt,
    weight: 0,
    color: color ?? DEFAULT_COLOR,
    queue: [],
    draw,
    changeColor
  }

  const dx = Math.abs(finishAt.x - startAt.x)
  const dy = Math.abs(finishAt.y - startAt.y)
  connection.weight = Math.sqrt(dx * dx + dy * dy)

  return connection

  function changeColor(color: ColorRGBA, frameCount = 2) {
    const { r: basicR, g: basicG, b: basicB } = connection.color
    const { r: targetR, g: targetG, b: targetB } = color
    const rStep = (targetR - basicR) / frameCount
    const gStep = (targetG - basicG) / frameCount
    const bStep = (targetB - basicB) / frameCount

    for (let i = 0; i <= frameCount; i++) {
      const r = basicR + rStep * i
      const g = basicG + gStep * i
      const b = basicB + bStep * i
      connection.queue.push({ color: { r, g, b } })
    }
  }

  function draw() {
    let isChanged = false

    if (connection.queue.length > 0) {
      const { color } = connection.queue.shift()!
      connection.color = color ?? connection.color

      isChanged = true
    }

    const context = getContext()
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = colors.rgbToHex(connection.color)
    context.moveTo(startAt.x, startAt.y)
    context.lineTo(finishAt.x, finishAt.y)
    context.stroke()

    return isChanged
  }
}

type ConnectionPayload = {
  startAt: Point
  finishAt: Point
  color?: ColorRGBA
}

export type Connection = {
  queue: Partial<ConnectionPayload>[]
  color: ColorRGBA
  weight: number
  draw: (width?: number) => boolean
  changeColor: (color: ColorRGBA, frameCount?: number) => void
} & ConnectionPayload
