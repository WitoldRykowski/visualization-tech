import type { VariantSetup } from '@/services/SandboxService/types'
import { initAnimation } from '@/services/SandboxService/sandbox.service'
import { generateRandomArray } from '@/services/ArrayService/array.service'
import { type Graph, Graph as createGraph } from './SandboxService/elements/Graph'
import { renderGraph } from '@/services/SandboxService/Creator'
import type { Point } from '@/services/SandboxService/elements/Point'
import type { MoveAnimation } from '@/services/SandboxService/elements/Column'
import { getRandomValueFromGivenArray, RGBColors } from '@/utils'

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
  breadthFirstSearch()
}

type QueueItem = { node: Point; distance: number }

function breadthFirstSearch() {
  const startNode = getStartNode()
  const endNode = getDestinationNode()
  const visited: Set<Point> = new Set()
  const parents: Map<Point, Point | null> = new Map()
  const queue: QueueItem[] = []

  queue.push({ node: startNode, distance: 0 })
  visited.add(startNode)
  parents.set(startNode, null)

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance)
    const { node, distance } = queue.shift()!

    if (node === endNode) {
      reconstructPath()
      return
    }

    for (const connection of node.connections) {
      const neighbor = connection.finishAt
      const weight = connection.weight

      if (!visited.has(neighbor)) {
        queue.push({ node: neighbor, distance: distance + weight })
        visited.add(neighbor)
        parents.set(neighbor, node)
      }

      moves.push({
        animation: 'changeColor',
        current: node,
        finishAt: neighbor,
        begin: startNode,
        destination: endNode
      })
    }
  }

  function getStartNode() {
    return getRandomValueFromGivenArray(graph!.points)
  }

  function getDestinationNode() {
    let potentialDestination = getRandomValueFromGivenArray(graph!.points)

    while (potentialDestination === startNode) {
      potentialDestination = getRandomValueFromGivenArray(graph!.points)
    }

    return potentialDestination
  }

  function reconstructPath() {
    const path: Point[] = []
    let currentNode: Point | undefined | null = endNode

    while (currentNode) {
      path.unshift(currentNode)
      currentNode = parents.get(currentNode)
    }

    for (let i = 0; i <= path.length - 2; i++) {
      moves.push({
        animation: 'changeColor-path',
        current: path[i],
        finishAt: path[i + 1],
        begin: startNode,
        destination: endNode
      })
    }
  }
}

function animateBfs() {
  if (!graph) return

  const isChanged = graph.draw()

  if (isChanged || !moves.length) return

  const move = moves.shift()!
  const { animation, begin, destination } = move
  const isPathAnimation = animation === 'changeColor-path'

  begin.changeColor(RGBColors.info)
  destination.changeColor(RGBColors.info)
  begin.isPulsing = !isPathAnimation
  destination.isPulsing = !isPathAnimation

  const color = !isPathAnimation ? RGBColors.grey4 : RGBColors.warning
  const { finishAt, current } = move

  if (current !== begin) {
    current.changeColor(color)
  }

  const connections = current.matchTwoWayConnection(finishAt)

  connections.forEach((connection) => connection.changeColor(color))

  if (!moves.length) {
    begin.changeColor(color)
    destination.changeColor(color)
  }
}

export const BFS: VariantSetup = {
  init: initBfs,
  visualize: visualizeBFS
}

type Move = {
  animation: MoveAnimation | 'changeColor-path'
  current: Point
  finishAt: Point
  begin: Point
  destination: Point
}
