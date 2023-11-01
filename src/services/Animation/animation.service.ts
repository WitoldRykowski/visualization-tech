export function getAnimationConfig(config?: Partial<AnimationConfig>): AnimationConfig {
  const DEFAULT_FRAME_COUNT = 10

  return {
    keepColor: !!config?.keepColor,
    frameCount: config?.frameCount ?? DEFAULT_FRAME_COUNT
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

export type MoveAnimation = 'swap' | 'jump' | 'collapse' | 'changeColor' | 'move' | 'touch'
