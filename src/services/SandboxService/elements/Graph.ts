import type { Connection } from '@/services/SandboxService/elements/Connection'
import type { Point } from '@/services/SandboxService/elements/Point'

export const Graph = (points: Point[] = [], connections: Connection[] = []) => {
  return {
    points,
    connections,
    draw
  }

  function draw() {
    for (const connection of connections) {
      connection.draw()
    }

    for (const point of points) {
      point.draw()
    }
  }
}

type Graph = {
  points: Point[]
  connections: Connection[]
  draw: () => void
}
