import { gql } from '@apollo/client'

export const GET_POKEMON_LIST = gql`
  query getPokemon(
    $offset: Int
    $limit: Int
    $search: String
    $orderBy: [pokemon_v2_pokemon_order_by!]
    $where: pokemon_v2_pokemon_bool_exp!
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: { _and: [{ name: { _ilike: $search } }, $where] }
    ) {
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

export const GET_POKEMON_BY_ID = gql`
  query getPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemoncries {
        cries
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities(limit: 1) {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonmoves(limit: 2) {
        pokemon_v2_move {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
          limit: 1
        ) {
          flavor_text
        }
      }
    }
  }
`
