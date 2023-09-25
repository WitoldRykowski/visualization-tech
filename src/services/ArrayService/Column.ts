import { lerp } from '@/utils'
import { getContext, getFrameCount } from '@/services/SandboxService/sandbox.service'
import { colors } from 'quasar'
import type { Noop } from '@/types'

export type MoveAnimation = 'swap' | 'jump' | 'collapse'

export const Column = (columnConfig: ColumnConfig): Column => {
  const column: Column = {
    ...columnConfig,
    color: colors.getPaletteColor('primary'),
    queue: [],
    draw,
    moveTo,
    jump,
    collapse
  }

  draw()

  return column

  function moveTo(location: QueueItem, yOffset = 1) {
    if (!location.x || !location.y) {
      throw Error(`x and y are required! Current ${{ x: location.x, y: location.y }}`)
    }

    const frameCount = getFrameCount()

    for (let i = 0; i <= frameCount; i++) {
      const t = i / frameCount
      const u = Math.sin(t * Math.PI)

      column.queue.push({
        x: lerp(column.x, location.x, t),
        y: lerp(column.y, location.y, t) + ((u * column.width) / 2) * yOffset,
        color: colors.getPaletteColor('secondary')
      })
    }
  }

  function jump() {
    const frameCount = getFrameCount()

    for (let i = 0; i <= frameCount; i++) {
      const t = i / frameCount
      const u = Math.sin(t * Math.PI)

      column.queue.push({
        x: column.x,
        y: column.y - u * column.width,
        color: colors.getPaletteColor('accent')
      })
    }
  }

  function collapse() {
    const frameCount = getFrameCount()

    for (let i = 0; i <= frameCount; i++) {
      const t = i / frameCount

      column.queue.push({})
    }
  }

  function draw() {
    let isChanged = false
    const primary = colors.getPaletteColor('primary')

    if (column.queue.length > 0) {
      const { x, y, color } = column.queue.shift()!

      column.x = x!
      column.y = y!
      column.color = color ?? primary
      isChanged = true
    } else {
      column.color = primary
    }

    const context = getContext()
    const { x, y, width, height, color } = column
    const left = x - width / 2
    const top = y - height
    const right = x + width / 2

    context.beginPath()
    context.fillStyle = color
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

type QueueItem = Partial<ColumnConfig> & { color?: string }

type ColumnConfig = {
  x: number
  y: number
  width: number
  height: number
}

export type Column = ColumnConfig & {
  queue: QueueItem[]
  color: string
  draw: () => boolean
  moveTo: (location: QueueItem, yOffset?: number, frameCount?: number) => void
  jump: Noop
  collapse: Noop
}
