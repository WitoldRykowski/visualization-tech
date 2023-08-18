import type { Component } from 'vue'
import type { PlaygroundSettings } from '@/services/SandboxService/types'
import { defineAsyncComponent, reactive } from 'vue'
import { generatePlaygroundSettings } from '@/services/SandboxService/sandbox.service'

export interface QueuePlayground {
  structureState: {}
  component: Component
  settings: PlaygroundSettings
}

export const getQueuePlayground = () => {
  return {
    structureState: reactive({}),
    component: defineAsyncComponent(() => import('@/components/Stack')),
    settings: generatePlaygroundSettings()
  }
}
