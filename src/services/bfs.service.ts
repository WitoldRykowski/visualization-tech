import type { VariantSetup } from '@/services/SandboxService/types'
import { initAnimation } from '@/services/SandboxService/sandbox.service'
import { generateRandomArray } from '@/services/ArrayService/array.service'
import { type Graph, Graph as createGraph } from './SandboxService/elements/Graph'
import { renderGraph } from '@/services/SandboxService/Creator'
import { convertNamedColorToRGB } from '@/utils'
import { colors } from 'quasar'

let moves: Move[] = []
let values: number[] = []
let graph: Graph | undefined = undefined

const initBfs = () => {
  initAnimation(init, animateBfs)

  function init() {
    values = generateRandomArray()
    const { points, connections } = renderGraph(values)

    graph = createGraph(points, connections)

    console.log(graph)
    moves = []
  }
}

function visualizeBFS() {
  moves = [{ animation: 'changeColor' }]
}

function animateBfs() {
  if (!graph) return

  const isChanged = graph.draw()

  if (isChanged || !moves.length) return

  graph.points.forEach((point) => {
    const startAt = graph!.connections[0].startAt
    const finishAt = graph!.connections[0].finishAt

    // TODO better matching
    if (point.x === startAt.x || point.x === finishAt.x) {
      point.changeColor({ r: 255, g: 0, b: 0 })
    }
  })

  graph.connections[0].changeColor({ r: 255, g: 255, b: 255 })
}

export const BFS: VariantSetup = {
  init: initBfs,
  visualize: visualizeBFS
}

type Move = {
  animation: 'changeColor'
}
