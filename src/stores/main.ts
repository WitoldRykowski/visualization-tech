import { reactive, readonly } from 'vue'
import { defineStore } from 'pinia'
import { type AlgorithmsList } from '@/services/algorithms.service'
import { type DataStructuresList } from '@/services/data-structures.service'

export type SandboxVariant = AlgorithmsList | DataStructuresList | undefined

export type MainState = {
  contentVariant: SandboxVariant
  search: string
}

export const useMainStore = defineStore('main', () => {
  const state = reactive<MainState>({
    contentVariant: undefined,
    search: ''
  })

  const setContentVariant = (value: SandboxVariant) => {
    state.contentVariant = value
  }

  const setSearch = (value: string) => {
    state.search = value
  }

  return {
    state: readonly(state),
    setContentVariant,
    setSearch
  }
})
