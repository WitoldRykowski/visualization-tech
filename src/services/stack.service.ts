import type { Component } from 'vue'
import type { PlaygroundSettings } from '@/services/SandboxService/types'
import { defineAsyncComponent, reactive } from 'vue'
import { generatePlaygroundSettings } from '@/services/SandboxService/sandbox.service'

export interface StackPlayground {
  structureState: {}
  component: Component
  settings: PlaygroundSettings
}

export const getStackPlayground = () => {
  return {
    structureState: reactive({}),
    component: defineAsyncComponent(() => import('@/components/Stack')),
    settings: generatePlaygroundSettings()
  }
}
