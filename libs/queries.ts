import { gql } from '@apollo/client'

export const GET_POKEMON_LIST = gql`
  query getPokemon($offset: Int, $limit: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`
