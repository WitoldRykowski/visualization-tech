import { getFrameCount } from '@/services/SandboxService/sandbox.service'

export function getAnimationConfig(config?: Partial<AnimationConfig>): AnimationConfig {
  return {
    keepColor: !!config?.keepColor,
    frameCount: config?.frameCount ?? getFrameCount()
  }
}

export function getMoveToAnimationConfig(
  config?: Partial<MoveToAnimationConfig>
): MoveToAnimationConfig {
  return {
    ...getAnimationConfig(config),
    yOffset: config?.yOffset ?? 1
  }
}

export type AnimationConfig = {
  keepColor: boolean
  frameCount: number
}

export type MoveToAnimationConfig = AnimationConfig & { yOffset: number }
