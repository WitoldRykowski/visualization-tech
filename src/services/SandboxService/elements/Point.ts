import { getContext } from '@/services/SandboxService/sandbox.service'
import { colors } from 'quasar'

export const Point = (x: number, y: number, value = 0): Point => {
  return {
    x,
    y,
    value,
    draw
  }

  function draw(size = 10) {
    const context = getContext()
    const radius = size / 2

    context.beginPath()
    context.fillStyle = colors.getPaletteColor('primary')
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
}

export type Point = {
  x: number
  y: number
  value: number
  draw: (size?: number) => void
}
