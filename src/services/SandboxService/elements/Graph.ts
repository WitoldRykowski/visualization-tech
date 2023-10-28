import type { Connection } from '@/services/SandboxService/elements/Connection'
import type { Point } from '@/services/SandboxService/elements/Point'
import { getContext, getSandboxSize } from '@/services/SandboxService/sandbox.service'

export const Graph = (points: Point[] = [], connections: Connection[] = []): Graph => {
  return {
    points,
    connections,
    draw
  }

  draw()

  function draw() {
    let isChanged = false

    for (const connection of connections) {
      isChanged = connection.draw() || isChanged
    }

    for (const point of points) {
      isChanged = point.draw() || isChanged
    }

    return isChanged
  }
}

export type Graph = {
  points: Point[]
  connections: Connection[]
  draw: () => boolean
}
