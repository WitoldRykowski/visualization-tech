import type { ComputedRef, InjectionKey } from 'vue'
import type { Noop } from '@/types'

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

export const clearSandbox = () => {
  const canvas = getCanvas()
  const context = getContext()

  context.clearRect(0, 0, canvas.width, canvas.height)
}

export const animate = (callback: Noop) => {
  const canvas = getCanvas()
  const context = getContext()
  context.clearRect(0, 0, canvas.width, canvas.height)

  callback()

  _animationFrameId = requestAnimationFrame(() => animate(callback))
}

export const stopAnimation = () => {
  cancelAnimationFrame(_animationFrameId)
}

export const ALGORITHMS_LIST = ['BinarySearch', 'BubbleSort', 'QuickSort'] as const
export const DATA_STRUCTURES_LIST = ['Stack', 'Queue'] as const

export type Variant =
  | (typeof ALGORITHMS_LIST)[number]
  | (typeof DATA_STRUCTURES_LIST)[number]
  | undefined

export const VariantInjectionKey = Symbol() as InjectionKey<ComputedRef<Variant>>

export * from './VariantSetups'
