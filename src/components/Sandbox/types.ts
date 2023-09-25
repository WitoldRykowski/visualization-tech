import type { VariantActions } from '@/services/SandboxService/sandbox.service'
import type { Noop } from '@/types'

export type VariantActionsForRef = VariantActions | { init: Noop; visualize: Noop }
