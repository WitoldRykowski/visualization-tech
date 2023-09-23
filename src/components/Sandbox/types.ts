import type { VariantActions } from '@/services/sandbox.service'
import type { Noop } from '@/types'

export type VariantActionsForRef = VariantActions | { init: Noop; visualize: Noop }
