import type { ComputedRef, InjectionKey } from 'vue'
import type { Noop } from '@/types'
import type { Column } from '@/services/ArrayService/Column'

let _animationFrameId = -1

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

export const initAnimation = (callback: Noop, animation: Noop) => {
  callback()
  stopAnimation()

  const animate = () => {
    const context = getContext()
    const { width, height } = getSandboxSize()
    context.clearRect(0, 0, width, height)

    animation()

    _animationFrameId = requestAnimationFrame(animate)
  }

  animate()
}

const POSSIBLE_TAGS = ['sorting', 'searching'] as const

type PossibleTags = readonly (typeof POSSIBLE_TAGS)[number][]

export type VariantName = (typeof ALGORITHMS)[number]['name'] | undefined

export type Variant = {
  name: string
  tags: PossibleTags
}

export const ALGORITHMS: readonly Variant[] = [
  { name: 'BinarySearch', tags: ['searching'] },
  { name: 'BubbleSort', tags: ['sorting'] },
  { name: 'GnomeSort', tags: ['sorting'] },
  { name: 'InsertionSort', tags: ['sorting'] },
  { name: 'SelectionSort', tags: ['sorting'] },
  { name: 'QuickSort', tags: ['sorting'] }
]

export const VariantInjectionKey = Symbol() as InjectionKey<ComputedRef<VariantName>>

export * from './variants'
