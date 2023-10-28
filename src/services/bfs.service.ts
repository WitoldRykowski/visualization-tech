import type { VariantSetup } from '@/services/SandboxService/types'
import { initAnimation } from '@/services/SandboxService/sandbox.service'
import { generateRandomArray } from '@/services/ArrayService/array.service'
import { type Graph, Graph as createGraph } from './SandboxService/elements/Graph'
import { renderGraph } from '@/services/SandboxService/Creator'
import type { Point } from '@/services/SandboxService/elements/Point'
import type { Connection } from '@/services/SandboxService/elements/Connection'

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
  breadthFirstSearch(graph!.points[0])
}

function breadthFirstSearch(startNode: Point) {
  const visited: Set<Point> = new Set()
  const queue: Point[] = []

  queue.push(startNode)
  visited.add(startNode)

  while (queue.length > 0) {
    const currentNode = queue.shift()!

    for (const connection of currentNode.connections) {
      const neighbor = connection.finishAt
      if (!visited.has(neighbor)) {
        queue.push(neighbor)
        visited.add(neighbor)
      }

      moves.push({ animation: 'changeColor', current: currentNode, finishAt: neighbor })
    }
  }
}

function animateBfs() {
  if (!graph) return

  const isChanged = graph.draw()

  if (isChanged || !moves.length) return
  console.log(moves)

  const white = { r: 255, g: 255, b: 255 }

  const { finishAt, current } = moves.shift()!

  current.changeColor(white)

  const currentConnection = current.connections.find((connection) => {
    const isXMatched = connection.finishAt.x === finishAt.x && connection.startAt.x === current.x
    const isYMatched = connection.finishAt.y === finishAt.y && connection.startAt.y === current.y

    return isXMatched && isYMatched
  })

  currentConnection!.changeColor(white)

  const finishAtConnection = finishAt.connections.find((connection) => {
    const isXMatched = connection.finishAt.x === current.x && connection.startAt.x === finishAt.x
    const isYMatched = connection.finishAt.y === current.y && connection.startAt.y === finishAt.y

    return isXMatched && isYMatched
  })

  if (finishAtConnection) {
    finishAtConnection.changeColor(white)
    finishAt.changeColor({ r: 255, g: 0, b: 0 })
  }
}

export const BFS: VariantSetup = {
  init: initBfs,
  visualize: visualizeBFS
}

type Move = {
  animation: 'changeColor'
  current: Point
  finishAt: Point
}
