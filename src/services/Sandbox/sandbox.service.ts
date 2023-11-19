import type { Noop } from '@/types'
import type { Column } from '@/services/Sandbox/elements/Column'

let _animationFrameId = -1

export const SANDBOX_TRANSITION = 500

export const initSandbox = () => {
  const mainContainer = document.getElementById('main-container')!
  const canvas = getCanvas()

  canvas.width = mainContainer.offsetWidth
  canvas.height = mainContainer.offsetHeight
}

export const getCanvas = () => {
  return document.getElementById('sandbox') as HTMLCanvasElement
}

export const getContext = () => {
  const canvas = getCanvas()
  return canvas.getContext('2d')!
}

export const getSandboxSize = () => {
  const canvas = getCanvas()

  return { width: canvas.width, height: canvas.height }
}

export const drawColumns = (columns: Column[]) => {
  let isChanged = false

  for (let i = 0; i < columns.length; i++) {
    isChanged = columns[i].draw() || isChanged
  }

  return isChanged
}

export const stopAnimation = () => {
  cancelAnimationFrame(_animationFrameId)
  _animationFrameId = -1
}

export const startAnimation = (animation: Noop) => {
  const animate = () => {
    const context = getContext()
    const { width, height } = getSandboxSize()
    context.clearRect(0, 0, width, height)

    animation()

    _animationFrameId = requestAnimationFrame(animate)
  }

  animate()
}

export const initAnimation = (animation: Noop) => {
  stopAnimation()
  startAnimation(animation)
}

export const POSSIBLE_TAGS = ['sorting', 'searching', 'graph', 'shortest-path', 'heap'] as const

export type Tag = (typeof POSSIBLE_TAGS)[number]

export type VariantName = (typeof ALGORITHMS)[number]['name'] | undefined

export type Variant = {
  name: string
  tags: readonly Tag[]
}

export const ALGORITHMS: readonly Variant[] = [
  { name: 'BinarySearch', tags: ['searching'] },
  { name: 'BreadthFirstSearch', tags: ['searching', 'graph', 'shortest-path'] },
  { name: 'BubbleSort', tags: ['sorting'] },
  { name: 'DepthFirstSearch', tags: ['searching', 'graph'] },
  { name: 'Dijkstra', tags: ['graph', 'shortest-path'] },
  { name: 'GnomeSort', tags: ['sorting'] },
  { name: 'HeapSort', tags: ['sorting', 'heap'] },
  { name: 'InsertionSort', tags: ['sorting'] },
  // { name: 'MergeSort', tags: ['sorting'] }, TODO Think how to visualize
  { name: 'SelectionSort', tags: ['sorting'] },
  { name: 'QuickSort', tags: ['sorting'] }
]

export * from './variants'
