import type { Component } from 'vue'
import type { PlaygroundSettings } from '@/services/SandboxService/types'
import { defineAsyncComponent, reactive } from 'vue'
import { generatePlaygroundSettings } from '@/services/SandboxService/sandbox.service'

export interface QuickSortPlayground {
  algorithmState: {}
  component: Component
  settings: PlaygroundSettings
}

export const getQuickSortPlayground = () => {
  return {
    algorithmState: reactive({}),
    component: defineAsyncComponent(() => import('@/components/QuickSort')),
    settings: generatePlaygroundSettings()
  }
}
