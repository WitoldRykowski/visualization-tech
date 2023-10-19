import type { ComputedRef, InjectionKey } from 'vue'
import type { Noop } from '@/types'
import type { Column } from '@/services/ArrayService/Column'

export const DEFAULT_FRAME_COUNT = 10

let _animationFrameId = -1
let currentFrameCount = DEFAULT_FRAME_COUNT

export const setFrameCount = (frameCount: number) => {
  currentFrameCount = frameCount
}

export const getFrameCount = () => {
  return currentFrameCount
}

export const initSandbox = () => {
  const mainContainer = document.getElementById('main-container')!
  const canvas = getCanvas()

  canvas.width = mainContainer.offsetWidth - 266
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

export const clearSandbox = () => {
  const { width, height } = getSandboxSize()
  const context = getContext()

  context.clearRect(0, 0, width, height)
}

export const animate = (callback: Noop) => {
  const context = getContext()
  const { width, height } = getSandboxSize()
  context.clearRect(0, 0, width, height)

  callback()

  _animationFrameId = requestAnimationFrame(() => animate(callback))
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

export const ALGORITHMS_LIST = ['BinarySearch', 'BubbleSort', 'QuickSort'] as const
export const DATA_STRUCTURES_LIST = ['Stack', 'Queue'] as const

export type Variant =
  | (typeof ALGORITHMS_LIST)[number]
  | (typeof DATA_STRUCTURES_LIST)[number]
  | undefined

export const VariantInjectionKey = Symbol() as InjectionKey<ComputedRef<Variant>>

export * from './VariantSetups'
