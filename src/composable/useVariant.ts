import { type SandboxVariant, useMainStore } from '@/stores/main'
import { computed } from 'vue'

export const useVariant = () => {
  const mainStore = useMainStore()

  const variant = computed({
    get: () => mainStore.state.contentVariant,
    set: (v) => mainStore.setContentVariant(v)
  })

  const setVariant = (variant: SandboxVariant) => {
    mainStore.setContentVariant(variant)
  }

  return { variant, setVariant }
}
