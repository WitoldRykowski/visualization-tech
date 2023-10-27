import type { Segment } from '@/services/SandboxService/elements/Segment'
import type { Point } from '@/services/SandboxService/elements/Point'

export const Graph = (points: Point[] = [], segments: Segment[] = []) => {
  return {
    points,
    segments,
    draw
  }

  function draw() {
    for (const segment of segments) {
      segment.draw()
    }

    for (const point of points) {
      point.draw()
    }
  }
}

type Graph = {
  points: Point[]
  segments: Segment[]
  draw: () => void
}
