import type { Point } from '@/services/SandboxService/elements/Point'
// https://github.com/mapbox/delaunator
// https://en.wikipedia.org/wiki/Delaunay_triangulation
// Library for Delaunay triangulation is implemented to create
// non-crossing connections between points in easy way
import Delaunator from 'delaunator'

export const createEdges = (points: Point[]) => {
  const edges = []
  const delaunay = Delaunator.from(points.map((point) => [point.x, point.y]))

  for (let i = 0; i < delaunay.triangles.length; i += 3) {
    const point1 = points[delaunay.triangles[i]]
    const point2 = points[delaunay.triangles[i + 1]]
    const point3 = points[delaunay.triangles[i + 2]]

    edges.push([point1, point2])
    edges.push([point2, point3])
    edges.push([point3, point1])
  }

  return edges
}
