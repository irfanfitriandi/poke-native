import { typeColors } from '@/constants/colors'

export interface Pokemon {
  __typename: string
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  pokemon_v2_pokemonsprites: PokemonSprite[]
  pokemon_v2_pokemontypes: PokemonTypeWrapper[]
  pokemon_v2_pokemonabilities: PokemonAbility[]
}

interface PokemonAbility {
  __typename: string
  pokemon_v2_ability: PokemonType
}

export type PokemonTypes = keyof typeof typeColors

export interface PokemonTypeWrapper {
  __typename: string
  pokemon_v2_type: PokemonType
}

export interface PokemonType {
  __typename: string
  name: PokemonTypes
}

interface PokemonSprite {
  __typename: string
  sprites: Sprites
}

interface Sprites {
  other: OtherSprites
  versions: Versions
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

interface Versions {
  'generation-i': GenerationI
  'generation-ii': GenerationII
  'generation-iii': GenerationIII
  'generation-iv': GenerationIV
  'generation-v': GenerationV
  'generation-vi': GenerationVI
  'generation-vii': GenerationVII
  'generation-viii': GenerationVIII
}

interface GenerationI {
  yellow: Yellow
  'red-blue': Yellow
}

interface Yellow extends BasicSpriteSet {
  back_gray: string
  front_gray: string
  back_transparent: string
  front_transparent: string
}

interface GenerationII {
  gold: TransparentSpriteSet
  silver: TransparentSpriteSet
  crystal: Crystal
}

interface TransparentSpriteSet extends BasicSpriteSet {
  front_transparent: string
}

interface Crystal extends TransparentSpriteSet {
  back_transparent: string
  back_shiny_transparent: string
  front_shiny_transparent: string
}

interface GenerationIII {
  emerald: OfficialArtwork
  'ruby-sapphire': BasicSpriteSet
  'firered-leafgreen': BasicSpriteSet
}

interface GenerationIV {
  platinum: AnimatedSpriteSet
  'diamond-pearl': AnimatedSpriteSet
  'heartgold-soulsilver': AnimatedSpriteSet
}

interface GenerationV {
  'black-white': BlackWhite
}

interface BlackWhite extends GenderedSpriteSet {
  animated: AnimatedSpriteSet
}

interface GenerationVI {
  'x-y': Home
  'omegaruby-alphasapphire': Home
}

interface GenerationVII {
  icons: Dreamworld
  'ultra-sun-ultra-moon': Home
}

interface GenerationVIII {
  icons: Dreamworld
}

interface OtherSprites {
  home: Home
  showdown: GenderedSpriteSet
  dream_world: Dreamworld
  'official-artwork': OfficialArtwork
}

interface Dreamworld {
  front_default: string
  front_female: null
}

interface OfficialArtwork {
  front_default: string
  front_shiny: string
}

interface Home extends GenderedSpriteSet {}

interface GenderedSpriteSet extends BasicSpriteSet {
  front_female: string | null
  back_female: string | null
  front_shiny_female: string | null
  back_shiny_female: string | null
}

interface AnimatedSpriteSet extends GenderedSpriteSet {}

interface BasicSpriteSet {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}
