import { typeColors } from '@/constants/colors'

export type PokemonTypes = keyof typeof typeColors
export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  pokemon_v2_pokemoncries: PokemonCry[]
  pokemon_v2_pokemontypes: PokemonTypeWrapper[]
  pokemon_v2_pokemonabilities: PokemonAbility[]
  pokemon_v2_pokemonmoves: PokemonMove[]
  pokemon_v2_pokemonstats: PokemonStat[]
  pokemon_v2_pokemonspecy: PokemonSpecy
  __typename: string
}

interface PokemonAbility {
  __typename: string
  pokemon_v2_ability: PokemonType
}

export interface PokemonTypeWrapper {
  __typename: string
  pokemon_v2_type: PokemonType
}

export interface PokemonType {
  __typename: string
  name: PokemonTypes
}

interface PokemonSpecy {
  pokemon_v2_pokemonspeciesflavortexts: Pokemonspeciesflavortext[]
  __typename: string
}

interface Pokemonspeciesflavortext {
  flavor_text: string
  __typename: string
}

interface PokemonStat {
  base_stat: number
  pokemon_v2_stat: Pokemonv2type
  __typename: string
}

interface PokemonMove {
  pokemon_v2_move: Pokemonv2type
  __typename: string
}

interface Pokemonability {
  pokemon_v2_ability: Pokemonv2type
  __typename: string
}

interface Pokemonv2type {
  name: string
  __typename: string
}

interface PokemonCry {
  cries: Cries
  __typename: string
}

interface Cries {
  latest: string
  legacy: string
}
