import type { NamedColor, colorsRgba as ColorRGBA } from 'quasar'
import { colors } from 'quasar'

export const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t
}

export const noop = () => {}

export const convertNamedColorToRGB = (color: NamedColor): ColorRGBA => {
  return colors.textToRgb(colors.getPaletteColor(color))
}
