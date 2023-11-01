import type { Point } from '@/services/Sandbox/elements/Point'
// https://github.com/mapbox/delaunator
// https://en.wikipedia.org/wiki/Delaunay_triangulation
// Library for Delaunay triangulation is implemented to create
// non-crossing connections between points in easy way
import Delaunator from 'delaunator'

export const createEdges = (points: Point[]) => {
  const edges = []
  const delaunay = Delaunator.from(points.map((point) => [point.x, point.y]))

  for (let i = 0; i < delaunay.triangles.length; i += 3) {
    const pointIndices = [
      delaunay.triangles[i],
      delaunay.triangles[i + 1],
      delaunay.triangles[i + 2]
    ]

    pointIndices.sort((a, b) => a - b)

    for (let j = 0; j < 3; j++) {
      const startIdx = pointIndices[j]
      const endIdx = pointIndices[(j + 1) % 3]
      const start = points[startIdx]
      const end = points[endIdx]
      edges.push([start, end])
    }
  }

  // In the Delaunay triangulation, each edge is added three times,
  // resulting in the duplicated connections, so we have to remove duplicates
  return edges.filter(
    (edge, index, self) =>
      index ===
      self.findIndex(
        (otherEdge) =>
          (otherEdge[0] === edge[0] && otherEdge[1] === edge[1]) ||
          (otherEdge[0] === edge[1] && otherEdge[1] === edge[0])
      )
  )
}
