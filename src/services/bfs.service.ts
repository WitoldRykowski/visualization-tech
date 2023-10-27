import type { VariantSetup } from '@/services/SandboxService/types'
import { initAnimation } from '@/services/SandboxService/sandbox.service'
import { generateRandomArray } from '@/services/ArrayService/array.service'
import { type Point } from '@/services/SandboxService/elements/Point'
import { type Segment } from '@/services/SandboxService/elements/Segment'
import { Graph } from './SandboxService/elements/Graph'
import { renderGraph } from '@/services/SandboxService/Creator'

let moves: Move[] = []
let values: number[] = []
let points: Point[] = []
let segments: Segment[] = []

const initBfs = () => {
  initAnimation(init, animateBfs)

  function init() {
    values = generateRandomArray()
    const { points: pointsList, segments: segmentsList } = renderGraph(values)

    points = pointsList
    segments = segmentsList
    moves = []
  }
}

function animateBfs() {
  const graph = Graph(points, segments)

  graph.draw()

  return moves
}

export const BFS: VariantSetup = {
  init: initBfs,
  visualize: () => {}
}

type Move = {}
