import type { VariantSetup } from '@/services/Sandbox/types'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateFilledArray } from '@/services/Array/array.service'
import { type Graph, Graph as createGraph } from '@/services/Sandbox/elements/Graph'
import { renderGraph } from '@/services/Sandbox/Creator'
import type { Point } from '@/services/Sandbox/elements/Point'
import type { MoveAnimation } from '@/services/Animation/animation.service'
import { getPointInGraphExcludingPoint, getRandomPointInGraph, RGBColors } from '@/utils'

const values = generateFilledArray()
let moves: Move[] = []
let graph: Graph | undefined = undefined

const initBfs = () => {
  initAnimation(init, animateBfs)

  function init() {
    moves = []

    const { points, connections } = renderGraph(values)

    graph = createGraph(points, connections)
  }
}

const visualizeBFS = () => {
  breadthFirstSearch()
}

type QueueItem = { node: Point; distance: number }

function breadthFirstSearch() {
  const startNode = getRandomPointInGraph(graph!.points)
  const endNode = getPointInGraphExcludingPoint(graph!.points, startNode)
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
