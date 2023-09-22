import type { ComputedRef, InjectionKey } from 'vue'
import { initBubbleSort } from './bubble-sort.service'

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

export const VariantInitFunctions: Record<NonNullable<Variant>, () => void> = {
  BubbleSort: initBubbleSort
}

export const getCanvas = () => {
  return document.getElementById('sandbox') as HTMLCanvasElement
}

export const getContext = () => {
  const canvas = getCanvas()
  return canvas.getContext('2d')!
}

const CANVAS_SIZE_SCALE = 0.85

export const initSandbox = () => {
  const canvas = getCanvas()
  canvas.width = calculateWidth()
  canvas.height = window.innerHeight * CANVAS_SIZE_SCALE

  function calculateWidth() {
    const result = window.innerWidth * CANVAS_SIZE_SCALE
    const MIN_WIDTH = 1000

    if (result < MIN_WIDTH) return MIN_WIDTH

    return result
  }
}
