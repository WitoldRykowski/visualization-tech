import type { Point } from '@/services/SandboxService/elements/Point'
import { getContext } from '@/services/SandboxService/sandbox.service'
import type { ColorRGBA } from '@/types'
import { colors } from 'quasar'

export const DEFAULT_COLOR: ColorRGBA = { r: 255, g: 165, b: 0 }

export const Connection = ({ startAt, finishAt, color }: ConnectionPayload) => {
  const connection: Connection = {
    startAt,
    finishAt,
    width: 2,
    color: color ?? DEFAULT_COLOR,
    queue: [],
    draw,
    changeColor
  }

  return connection

  function changeColor(color: ColorRGBA, frameCount = 15) {
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
      connection.width = 4

      isChanged = true
    }

    const context = getContext()
    context.beginPath()
    context.lineWidth = connection.width
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
  width: number
  draw: (width?: number) => boolean
  changeColor: (color: ColorRGBA, frameCount?: number) => void
} & ConnectionPayload
