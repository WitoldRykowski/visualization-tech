const DEFAULT_ARRAY_SIZE = 100

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
    const randomNumber = Math.floor(Math.random() * (size + 1))

    if (!nonSortedArray.includes(randomNumber)) {
      nonSortedArray.push(randomNumber)
    }
  }

  return nonSortedArray
}
