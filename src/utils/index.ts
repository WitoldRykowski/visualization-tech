import { colors, type NamedColor } from 'quasar'
import type { ColorRGBA } from '@/types'
import type { Point } from '@/services/Sandbox/elements/Point'

export const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t
}

export const convertNamedColorToRGB = (color: NamedColor): ColorRGBA => {
  return colors.textToRgb(colors.getPaletteColor(color))
}

export const getRandomValueFromGivenArray = <T>(values: T[]) => {
  const lastArrayIndex = values.length - 1
  const index = Math.floor(Math.random() * lastArrayIndex)

  return values[index]
}

export const getRandomPointInGraph = (points: Point[]) => {
  return getRandomValueFromGivenArray(points)
}

export const getPointInGraphExcludingPoint = (points: Point[], exclude: Point) => {
  let point = getRandomValueFromGivenArray(points)

  while (point === exclude) {
    point = getRandomValueFromGivenArray(points)
  }

  return point
}

export const convertCamelCaseToText = (text: string) => {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export const RGBColors = {
  primary: convertNamedColorToRGB('primary'),
  positive: convertNamedColorToRGB('positive'),
  negative: convertNamedColorToRGB('negative'),
  info: convertNamedColorToRGB('info'),
  pink: convertNamedColorToRGB('pink-6'),
  lightBlue: convertNamedColorToRGB('light-blue-5'),
  green: convertNamedColorToRGB('green-13'),
  warning: convertNamedColorToRGB('warning'),
  grey: convertNamedColorToRGB('grey-1'),
  grey4: convertNamedColorToRGB('grey-4')
}
