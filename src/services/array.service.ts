import { getCanvas, getContext } from '@/services/sandbox.service'
import { colors } from 'quasar'
import { lerp } from '@/utils'

export const DEFAULT_ARRAY_SIZE = 70
const MARGIN = 30

export const generateSortedArray = (size = DEFAULT_ARRAY_SIZE) => {
  const sortedArray: number[] = []

  for (let i = 1; i <= size; i++) {
    sortedArray.push(i)
  }

  return sortedArray
}

export const generateNonSortedArray = (size = DEFAULT_ARRAY_SIZE) => {
  const nonSortedArray: number[] = []

  while (nonSortedArray.length <= size) {
    const randomNumber = Math.random()

    if (!nonSortedArray.includes(randomNumber)) {
      nonSortedArray.push(randomNumber)
    }
  }

  return nonSortedArray
}

type Column = {
  x: number
  y: number
  width: number
  height: number
  queue: Location[]
  draw: () => boolean
  moveTo: (location: Location, yOffset?: number, frameCount?: number) => void
}

type ColumnConfig = Omit<Column, 'draw' | 'queue' | 'moveTo'>

type Location = Pick<Column, 'x' | 'y'>

const Column = (columnConfig: ColumnConfig): Column => {
  const column: Column = { ...columnConfig, queue: [], draw, moveTo }

  draw()

  return column

  function moveTo(location: Location, yOffset = 1, frameCount = 20) {
    for (let i = 0; i <= frameCount; i++) {
      const t = i / frameCount
      const u = Math.sin(t * Math.PI)

      column.queue.push({
        x: lerp(column.x, location.x, t),
        y: lerp(column.y, location.y, t) + ((u * column.width) / 2) * yOffset
      })
    }
  }

  function draw() {
    let isChanged = false

    if (column.queue.length > 0) {
      const { x, y } = column.queue.shift()!

      column.x = x
      column.y = y
      isChanged = true
    }

    const context = getContext()
    const { x, y, width, height } = column
    const left = x - width / 2
    const top = y - height
    const right = x + width / 2

    context.beginPath()
    context.fillStyle = colors.getPaletteColor('primary')
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

export const renderArray = (values: number[]) => {
  const canvas = getCanvas()

  const valuesSize = values.length
  const columns: Column[] = []
  const spacing = (canvas.width - MARGIN * 2) / valuesSize
  const maxColumnHeight = 500

  for (let i = 0; i < valuesSize; i++) {
    const xAxis = i * spacing + spacing / 2 + MARGIN
    const yAxis = canvas.height - MARGIN - i * 3
    const columnHeight = maxColumnHeight * values[i]

    columns[i] = Column({
      x: xAxis,
      y: yAxis,
      width: spacing - 4,
      height: columnHeight
    })
  }

  return columns
}
