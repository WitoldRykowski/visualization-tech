import { Graph as createGraph, type Graph } from '@/services/Sandbox/elements/Graph'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateFilledArray } from '@/services/Array/array.service'
import { type VariantSetup } from '@/services/Sandbox/types'
import type { Point } from '@/services/Sandbox/elements/Point'
import { getPointInGraphExcludingPoint, getRandomPointInGraph, RGBColors } from '@/utils'
import type { MoveAnimation } from '@/services/Animation/animation.service'

const values = generateFilledArray()
let moves: Move[] = []
let graph: Graph | undefined = undefined

const initDfs = () => {
  initAnimation(init, animateDfs)

  function init() {
    moves = []

    graph = createGraph(values)
  }
}

const visualizeDfs = () => {
  runDFS()
}

function runDFS() {
  const start = getRandomPointInGraph(graph!.points)
  const destination = getPointInGraphExcludingPoint(graph!.points, start)

  const path = depthFirstSearch(start)

  while (path.length > 1) {
    const node = path.shift()!

    moves.push({
      animation: 'changeColor-path',
      destination,
      begin: start,
      current: node,
      finishAt: path[0]
    })
  }

  function depthFirstSearch(node: Point, visited: Set<Point> = new Set()): Point[] {
    if (!graph) {
      throw Error('Graph is undefined!')
    }

    if (node === destination) {
      return [node]
    }

    visited.add(node)

    for (const connection of graph.getPointConnections(node)) {
      moves.push({
        animation: 'changeColor',
        destination,
        begin: start,
        current: node,
        finishAt: connection.finishAt
      })

      if (!visited.has(connection.finishAt)) {
        const path = depthFirstSearch(connection.finishAt, visited)

        if (path.length > 0) {
          return [node, ...path]
        }
      }
    }

    visited.delete(start)

    return []
  }
}

function animateDfs() {
  if (!graph) return

  const isChanged = graph.draw()

  if (isChanged || !moves.length) return

  const move = moves.shift()!
  const { animation, begin, destination, finishAt, current } = move
  const isPathAnimation = animation === 'changeColor-path'
  const color = !isPathAnimation ? RGBColors.grey4 : RGBColors.warning

  destination.changeColor(RGBColors.info)
  destination.isPulsing = !isPathAnimation
  begin.isPulsing = !isPathAnimation
  begin.changeColor(RGBColors.info)

  if (current !== begin) {
    current.changeColor(color)
  }

  const connections = graph.getConnectionsBetweenPoints(current, finishAt)
  connections.forEach((connection) => connection.changeColor(color))

  if (!moves.length) {
    begin.changeColor(color)
    destination.changeColor(color)
  }
}

export const DFS: VariantSetup = {
  init: initDfs,
  visualize: visualizeDfs
}

type Move = {
  animation: MoveAnimation | 'changeColor-path'
  current: Point
  finishAt: Point
  destination: Point
  begin: Point
}
