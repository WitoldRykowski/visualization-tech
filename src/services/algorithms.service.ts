export const ALGORITHMS_LIST = ['BinarySearch', 'BubbleSort', 'QuickSort'] as const

export type AlgorithmsList = (typeof ALGORITHMS_LIST)[number]
