import type { ComputedRef, InjectionKey } from 'vue'
import { initBubbleSort, visualizeBubbleSort } from './bubble-sort.service'
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
  const canvas = getCanvas()
  const CANVAS_SIZE_SCALE = 0.85

  canvas.width = calculateWidth()
  canvas.height = window.innerHeight * CANVAS_SIZE_SCALE

  function calculateWidth() {
    const result = window.innerWidth * CANVAS_SIZE_SCALE
    const MIN_WIDTH = 1000

    if (result < MIN_WIDTH) return MIN_WIDTH

    return result
  }
}

export const getCanvas = () => {
  return document.getElementById('sandbox') as HTMLCanvasElement
}

export const getContext = () => {
  const canvas = getCanvas()
  return canvas.getContext('2d')!
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

export const ALGORITHMS_LIST = [
  // 'BinarySearch',
  'BubbleSort'
  // 'QuickSort'
] as const
export const DATA_STRUCTURES_LIST = [
  // 'Stack',
  // 'Queue'
] as const

export type Variant =
  | (typeof ALGORITHMS_LIST)[number]
  | (typeof DATA_STRUCTURES_LIST)[number]
  | undefined

export const VariantInjectionKey = Symbol() as InjectionKey<ComputedRef<Variant>>

export type VariantActions = { init: () => void; visualize: () => void }

type VariantSetup = {
  actions: VariantActions
  delays: number[]
}

const BubbleSortSetup = {
  actions: { init: initBubbleSort, visualize: visualizeBubbleSort },
  delays: [10, 20, 50]
}

export const VariantSetups: Record<NonNullable<Variant>, VariantSetup> = {
  BubbleSort: BubbleSortSetup
}
