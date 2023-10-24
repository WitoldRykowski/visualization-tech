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

const POSSIBLE_ALGORITHM_TAGS = ['sorting', 'searching'] as const
const POSSIBLE_DATA_STRUCTURE_TAGS = [
  'stacks',
  'queues',
  'linked-lists',
  'trees',
  'graphs',
  'heaps'
] as const

type PossibleAlgorithmTags = readonly (typeof POSSIBLE_ALGORITHM_TAGS)[number][]
type PossibleDataStructuresTags = readonly (typeof POSSIBLE_DATA_STRUCTURE_TAGS)[number][]

export type Algorithm = {
  name: string
  tags: PossibleAlgorithmTags
}

export type DataStructure = {
  name: string
  tags: PossibleDataStructuresTags
}

export type VariantName =
  | (typeof ALGORITHMS)[number]['name']
  | (typeof DATA_STRUCTURES)[number]['name']
  | undefined

export type Variant = Algorithm | DataStructure

export const ALGORITHMS: readonly Algorithm[] = [
  { name: 'BinarySearch', tags: ['searching'] },
  { name: 'BubbleSort', tags: ['sorting'] },
  { name: 'GnomeSort', tags: ['sorting'] },
  { name: 'InsertionSort', tags: ['sorting'] },
  { name: 'SelectionSort', tags: ['sorting'] },
  { name: 'QuickSort', tags: ['sorting'] }
]

export const DATA_STRUCTURES: readonly DataStructure[] = [
  { name: 'Stack', tags: ['stacks'] },
  { name: 'Queue', tags: ['queues'] }
]

export const VariantInjectionKey = Symbol() as InjectionKey<ComputedRef<VariantName>>

export * from './VariantSetups'
