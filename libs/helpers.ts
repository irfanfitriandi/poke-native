// Pokemon
import { PokemonTypeWrapper } from './types'

export const getPokemonArtwork = (id: string | number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const getPokemonNumber = (id: string | number): string =>
  `#${id.toString().padStart(4, '0')}`

export const getPokemonTypes = (types: PokemonTypeWrapper[]) =>
  types.map((t) => t.pokemon_v2_type.name)

export const formatWeight = (weight?: number): string =>
  weight !== undefined ? `${(weight / 10).toString().replace('.', ',')} kg` : ''

export const formatHeight = (height?: number): string =>
  height !== undefined ? `${(height / 10).toString().replace('.', ',')} m` : ''

// Style
import type { DimensionValue } from 'react-native'

export const ratioToPercent = (value: number, max: number): DimensionValue =>
  `${(value / max) * 100}%`

// Utils
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(function (this: () => void) {
      func.apply(this, args)
    }, delay)
  }
}
