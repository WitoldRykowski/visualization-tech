import type { VariantSetup } from '@/services/SandboxService/types'
import { initAnimation } from '@/services/SandboxService/sandbox.service'
import { generateRandomArray } from '@/services/ArrayService/array.service'
import { type Point } from '@/services/SandboxService/elements/Point'
import { type Connection } from '@/services/SandboxService/elements/Connection'
import { Graph } from './SandboxService/elements/Graph'
import { renderGraph } from '@/services/SandboxService/Creator'

let moves: Move[] = []
let values: number[] = []
let points: Point[] = []
let connections: Connection[] = []

const initBfs = () => {
  initAnimation(init, animateBfs)

  function init() {
    values = generateRandomArray()
    const { points: pointsList, connections: connectionsList } = renderGraph(values)

    points = pointsList
    connections = connectionsList
    moves = []
  }
}

function animateBfs() {
  const graph = Graph(points, connections)

  graph.draw()

  return moves
}

export const BFS: VariantSetup = {
  init: initBfs,
  visualize: () => {}
}

type Move = {}
