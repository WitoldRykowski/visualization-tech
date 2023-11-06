import { Graph as createGraph, Graph } from '@/services/Sandbox/elements/Graph'
import { initAnimation } from '@/services/Sandbox/sandbox.service'
import { generateFilledArray } from '@/services/Array/array.service'
import type { VariantSetup } from '@/services/Sandbox/types'
import type { Point } from '@/services/Sandbox/elements/Point'
import { getPointInGraphExcludingPoint, getRandomPointInGraph, RGBColors } from '@/utils'
import type { MoveAnimation } from '@/services/Animation/animation.service'

const values = generateFilledArray()
let moves: Move[] = []
let graph: Graph

const initDijkstra = () => {
  initAnimation(init, animateDijkstra)

  function init() {
    moves = []

    graph = createGraph(values)
  }
}

const visualizeDijkstra = () => {
  dijkstra()
}

function dijkstra() {
  const start = getRandomPointInGraph(graph.points)
  const end = getPointInGraphExcludingPoint(graph.points, start)
  const distances: Record<string, number> = {}
  const previous: Record<string, Point | null> = {}

  for (const point of graph.points) {
    const key = generatePointKey(point)
    distances[key] = Infinity
    previous[key] = null
  }

  distances[`${start.x},${start.y}`] = 0
  const unvisitedPoints = [...graph.points]

  while (unvisitedPoints.length > 0) {
    const currentPoint = unvisitedPoints.reduce((min, point) => {
      const pointKey = generatePointKey(point)
      const minKey = generatePointKey(min)

      return distances[pointKey] < distances[minKey] ? point : min
    })

    unvisitedPoints.splice(unvisitedPoints.indexOf(currentPoint), 1)

    if (currentPoint === end) {
      break
    }

    const key = generatePointKey(currentPoint)

    for (const connection of currentPoint.connections) {
      moves.push({
        animation: 'changeColor',
        destination: end,
        start,
        current: currentPoint,
        finishAt: connection.finishAt
      })

      const neighbor = connection.finishAt
      const neighborKey = generatePointKey(neighbor)

      const potentialDistance = distances[key] + connection.weight
      if (potentialDistance < distances[neighborKey]) {
        distances[neighborKey] = potentialDistance
        previous[neighborKey] = currentPoint
      }
    }
  }

  let current: Point | null = end

  while (current !== null) {
    const key = generatePointKey(current)

    moves.push({
      animation: 'changeColor-path',
      destination: end,
      start,
      current,
      finishAt: previous[key]
    })
    current = previous[key]
  }

  function generatePointKey(point: Point) {
    return `${point.x},${point.y}`
  }
}

function animateDijkstra() {
  const isChanged = graph.draw()

  if (isChanged || !moves.length) return

  const move = moves.shift()!
  const { animation, start, current, finishAt, destination } = move
  const isPathAnimation = animation === 'changeColor-path'
  const color = !isPathAnimation ? RGBColors.grey4 : RGBColors.warning

  start.changeColor(RGBColors.info)
  destination.changeColor(RGBColors.info)
  start.isPulsing = !!moves.length
  destination.isPulsing = !!moves.length

  if (current !== start) {
    current.changeColor(color)
  }

  if (finishAt) {
    const connections = current.matchTwoWayConnection(finishAt)

    connections.forEach((connection) => connection.changeColor(color))
  }

  if (!moves.length) {
    start.changeColor(color)
    destination.changeColor(color)
  }
}

export const Dijkstra: VariantSetup = {
  init: initDijkstra,
  visualize: visualizeDijkstra
}

type Move = {
  animation: MoveAnimation | 'changeColor-path'
  current: Point
  finishAt: Point | null
  start: Point
  destination: Point
}
