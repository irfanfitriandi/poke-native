import { Link } from 'expo-router'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

import { Colors } from '@/constants/colors'
import {
  getPokemonArtwork,
  getPokemonNumber,
  getPokemonTypes,
} from '@/libs/helpers'
import { Pokemon } from '@/libs/types'

import Card from '../shared/Card'
import MonoText from '../shared/MonoText'
import PokemonTypeBadge from './PokemonTypeBadge'

interface Props {
  pokemon: Pokemon
}

const PokemonCard = ({ pokemon }: Props) => {
  const pokemonId = getPokemonNumber(pokemon.id)
  const artworkUri = getPokemonArtwork(pokemon.id)
  const types = getPokemonTypes(pokemon.pokemon_v2_pokemontypes)
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={{ pathname: '/pokemon/[id]', params: { id: pokemon.id } }}
      asChild
    >
      <Pressable style={styles.pressable}>
        <Card style={styles.card}>
          <MonoText style={styles.pokemonId} variant="caption">
            {pokemonId}
          </MonoText>
              <Image
                source={imageError ? require('@/assets/images/pokeball-color.png') : { uri: artworkUri }}
                style={styles.image}
                resizeMode="contain"
                onError={() => setImageError(true)}
                defaultSource={require('@/assets/images/pokeball-color.png')}
              />
          <MonoText style={styles.pokemonName} weight="bold">
            {pokemon.name}
          </MonoText>
          <View style={styles.typesContainer}>
            {types.map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
          </View>
          <View style={styles.shadow} />
        </Card>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1 / 3,
  },
  card: {
    position: 'relative',
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
  },
  pokemonId: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  pokemonName: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: Colors.light.secondary,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingTop: 8,
  },
  shadow: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 7,
    height: 70,
    zIndex: -1,
    backgroundColor: Colors.light.grayBackground,
  },
})

export default PokemonCard
