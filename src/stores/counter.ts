import { reactive, readonly } from 'vue'
import { defineStore } from 'pinia'

export type MainState = {
  search: string
}

export const useMainStore = defineStore('main', () => {
  const state = reactive<MainState>({
    search: ''
  })

  const setSearch = (value: string) => {
    state.search = value
  }

  return {
    state: readonly(state),
    setSearch
  }
})
