import type { VariantSetup } from '@/services/SandboxService/types'
import { initAnimation } from '@/services/SandboxService/sandbox.service'
import { generateRandomArray } from '@/services/ArrayService/array.service'
import { type Graph, Graph as createGraph } from './SandboxService/elements/Graph'
import { renderGraph } from '@/services/SandboxService/Creator'

let moves: Move[] = []
let values: number[] = []
let graph: Graph | undefined = undefined

const initBfs = () => {
  initAnimation(init, animateBfs)

  function init() {
    values = generateRandomArray()
    moves = []

    const { points, connections } = renderGraph(values)

    graph = createGraph(points, connections)
  }
}

function visualizeBFS() {
  moves = [{ animation: 'changeColor' }]
}

function animateBfs() {
  if (!graph) return

  const isChanged = graph.draw()

  if (isChanged || !moves.length) return
  const white = { r: 255, g: 255, b: 255 }

  graph.points.forEach((point) => {
    const startAt = graph!.connections[0].startAt
    const finishAt = graph!.connections[0].finishAt

    // TODO better matching
    if (point.x === startAt.x || point.x === finishAt.x) {
      point.changeColor(white)
    }
  })

  graph.connections[0].changeColor(white)
}

export const BFS: VariantSetup = {
  init: initBfs,
  visualize: visualizeBFS
}

type Move = {
  animation: 'changeColor'
}
