import type { Component } from 'vue'
import type { PlaygroundSettings } from '@/services/SandboxService/types'
import { defineAsyncComponent, reactive } from 'vue'
import { generatePlaygroundSettings } from '@/services/SandboxService/sandbox.service'

export interface BubbleSortPlayground {
  algorithmState: {}
  component: Component
  settings: PlaygroundSettings
}

export const getBubbleSortPlayground = () => {
  return {
    algorithmState: reactive({}),
    component: defineAsyncComponent(() => import('@/components/BubbleSort')),
    settings: generatePlaygroundSettings()
  }
}
