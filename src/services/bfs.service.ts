import type { VariantSetup } from '@/services/SandboxService/types'
import { initAnimation } from '@/services/SandboxService/sandbox.service'
import { generateRandomArray } from '@/services/ArrayService/array.service'
import { type Graph, Graph as createGraph } from './SandboxService/elements/Graph'
import { renderGraph } from '@/services/SandboxService/Creator'
import type { Point } from '@/services/SandboxService/elements/Point'

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
  const queue: Queue[] = []
  const index = Math.floor(Math.random() * graph!.points.length - 1)
  const endNode = graph!.points[index]
  const parents: Map<Point, Parent> = new Map()

  queue.push({ node: startNode, distance: 0 })
  visited.add(startNode)
  parents.set(startNode, { parent: null, distance: 0 })

  while (queue.length > 0) {
    const { node, distance } = queue.shift()!

    if (node === endNode) {
      reconstructPath()
      return
    }

    for (const connection of node.connections) {
      const neighbor = connection.finishAt
      if (!visited.has(neighbor)) {
        queue.push({ node: neighbor, distance: distance + connection.weight })
        visited.add(neighbor)

        parents.set(neighbor, { parent: node, distance: distance + connection.weight })
      }

      moves.push({
        animation: 'changeColor',
        current: node,
        finishAt: neighbor,
        startAt: startNode,
        destination: endNode
      })
    }
  }

  function reconstructPath() {
    const { node } = queue.shift()!

    if (node === endNode) {
      const path: Point[] = []
      let currentNode: Point | null = endNode

      while (currentNode && currentNode !== startNode) {
        path.unshift(currentNode)
        currentNode = parents.get(currentNode)!.parent
      }

      path.unshift(startNode)

      for (let i = 0; i <= path.length - 2; i++) {
        moves.push({
          animation: 'changeColor-path',
          current: path[i],
          finishAt: path[i + 1],
          startAt: startNode,
          destination: endNode
        })
      }
    }
  }
}

function animateBfs() {
  if (!graph) return

  const isChanged = graph.draw()

  if (isChanged || !moves.length) return

  const move = moves.shift()!
  const { animation, startAt, destination } = move
  const green = { r: 0, g: 255, b: 0 }
  const red = { r: 255, g: 0, b: 0 }
  const white = { r: 255, g: 255, b: 255 }

  startAt.changeColor(green)
  destination.changeColor(green)

  const color = animation === 'changeColor' ? white : red
  const { finishAt, current } = move

  if (current !== startAt) {
    current.changeColor(color)
  }

  const currentConnection = matchConnection(current, finishAt)
  const finishAtConnection = matchConnection(finishAt, current)

  if (currentConnection) {
    currentConnection!.changeColor(color)
  }

  if (finishAtConnection) {
    finishAtConnection.changeColor(color)
  }

  function matchConnection(start: Point, destination: Point) {
    return start.connections.find((connection) => {
      const isXMatched = connection.finishAt.x === destination.x && connection.startAt.x === start.x
      const isYMatched = connection.finishAt.y === destination.y && connection.startAt.y === start.y

      return isXMatched && isYMatched
    })
  }
}

export const BFS: VariantSetup = {
  init: initBfs,
  visualize: visualizeBFS
}

type Move = {
  animation: 'changeColor' | 'changeColor-path'
  current: Point
  finishAt: Point
  startAt: Point
  destination: Point
}

type Parent = { parent: Point | null; distance: number }

type Queue = {
  node: Point
  distance: number
}
