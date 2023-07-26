import { ref } from 'vue'

export const useStack = () => {
  const stack = ref<number[]>([])

  const addToStack = () => {
    stack.value.push(1)
  }

  const removeFromStack = () => {
    stack.value.pop()
  }

  return {
    stack,
    addToStack,
    removeFromStack
  }
}
