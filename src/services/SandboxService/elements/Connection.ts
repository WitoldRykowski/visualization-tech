import type { Point } from '@/services/SandboxService/elements/Point'
import { getContext } from '@/services/SandboxService/sandbox.service'
import { colors } from 'quasar'

export const Connection = (startAt: Point, finishAt: Point) => {
  return {
    startAt,
    finishAt,
    draw
  }

  function draw(width = 2) {
    const context = getContext()
    context.beginPath()
    context.lineWidth = width
    context.strokeStyle = colors.getPaletteColor('success')
    context.moveTo(startAt.x, startAt.y)
    context.lineTo(finishAt.x, finishAt.y)
    context.stroke()
  }
}

export type Connection = {
  startAt: Point
  finishAt: Point
  draw: (width?: number) => void
}
