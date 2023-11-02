const DEFAULT_ARRAY_SIZE = 40

export const generateSortedArray = (size = DEFAULT_ARRAY_SIZE) => {
  const sortedArray: number[] = []
  const SAFE_HEIGHT_MULTIPLIER = 50

  for (let i = 1; i <= size; i++) {
    sortedArray.push(i / SAFE_HEIGHT_MULTIPLIER)
  }

  return sortedArray
}

export const generateFilledArray = (size = 100) => {
  const values = new Array(size)
  values.fill(0)

  return values
}

export const generateNonSortedArray = (size = DEFAULT_ARRAY_SIZE) => {
  const nonSortedArray: number[] = []

  for (let i = 0; i < size; i++) {
    nonSortedArray.push(Math.random())
  }

  return nonSortedArray
}
