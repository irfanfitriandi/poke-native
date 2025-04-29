import { useApolloClient, useQuery } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import FadingImage from '@/components/FadingImage'
import RootView from '@/components/layout/RootView'
import PokemonSpecs from '@/components/pokemon/PokemonSpecs'
import PokeSpinner from '@/components/pokemon/PokemonSpinner'
import PokemonStats from '@/components/pokemon/PokemonStats'
import PokemonTypeBadge from '@/components/pokemon/PokemonTypeBadge'
import SearchModal from '@/components/SearchModal'
import Card from '@/components/shared/Card'
import MonoText from '@/components/shared/MonoText'
import { useThemeColor } from '@/hooks/useThemeColor'
import {
  formatHeight,
  formatWeight,
  getPokemonArtwork,
  getPokemonNumber,
} from '@/libs/helpers'
import { GET_POKEMON_BY_ID } from '@/libs/queries'
import { type Pokemon } from '@/libs/types'

const MAX_POKEMON = 10277

const usePokemonData = (id: number) => {
  return useQuery<{ pokemon_v2_pokemon_by_pk: Pokemon }>(GET_POKEMON_BY_ID, {
    variables: { id },
  })
}

const getSpecs = (pokemon?: Pokemon) => [
  {
    name: 'Weight',
    icon: 'scale' as keyof typeof MaterialIcons.glyphMap,
    spec: formatWeight(pokemon?.weight),
  },
  {
    name: 'Height',
    icon: 'straighten' as keyof typeof MaterialIcons.glyphMap,
    spec: formatHeight(pokemon?.height),
  },
  {
    name: 'Ability',
    icon: 'emoji-objects' as keyof typeof MaterialIcons.glyphMap,
    spec:
      pokemon?.pokemon_v2_pokemonabilities[0]?.pokemon_v2_ability.name ??
      'Unknown',
  },
]

interface Props {
  pokemon?: Pokemon
  color: string
  id: number
  specs: ReturnType<typeof getSpecs>
  stats: Pokemon['pokemon_v2_pokemonstats']
  onPrev: () => void
  onNext: () => void
  loading: boolean
  onButtonSearch: () => void
  comparisonStat?: Pokemon['pokemon_v2_pokemonstats']
  comparisonColor?: string
}

const PokemonColumn = ({
  pokemon,
  color,
  id,
  specs,
  stats,
  onPrev,
  onNext,
  loading,
  onButtonSearch,
  comparisonStat,
  comparisonColor,
}: Props) => {
  const colors = useThemeColor()

  if (!pokemon || loading) {
    return (
      <View style={styles.pokemonColumn}>
        <ActivityIndicator size="small" color={colors.tint} />
      </View>
    )
  }

  return (
    <View style={styles.pokemonColumn}>
      <View style={styles.pokemonHeader}>
        <MonoText style={[styles.pokemonName, { color }]}>
          {pokemon.name}
        </MonoText>
        <MonoText style={{ color: colors.text }}>
          {getPokemonNumber(id)}
        </MonoText>
      </View>

      <FadingImage url={getPokemonArtwork(id)} width={150} height={150} />

      <View style={styles.typesWrapper}>
        {pokemon.pokemon_v2_pokemontypes.map((type) => (
          <PokemonTypeBadge
            key={type.pokemon_v2_type.name}
            type={type.pokemon_v2_type.name}
          />
        ))}
      </View>

      <View style={styles.specsWrapper}>
        {specs.map((spec) => (
          <PokemonSpecs key={spec.name} {...spec} color={color} />
        ))}
      </View>

      <View style={styles.stats}>
        {stats.map((stat) => (
          <PokemonStats
            key={stat.pokemon_v2_stat.name}
            name={stat.pokemon_v2_stat.name}
            value={stat.base_stat}
            color={color}
            comparisonValue={
              comparisonStat?.find(
                (s) => stat.pokemon_v2_stat.name === s.pokemon_v2_stat.name
              )?.base_stat
            }
            comparisonColor={comparisonColor}
          />
        ))}
      </View>

      <View style={styles.selectionControls}>
        <Pressable
          style={[styles.selectionButton, { backgroundColor: color }]}
          onPress={onPrev}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Pressable
          style={[styles.selectionButton, { backgroundColor: color }]}
          onPress={onButtonSearch}
        >
          <MaterialIcons name="search" size={24} color="white" />
        </Pressable>
        <Pressable
          style={[styles.selectionButton, { backgroundColor: color }]}
          onPress={onNext}
        >
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

const PokemonCompareScreen = () => {
  const { id } = useLocalSearchParams()
  const colors = useThemeColor()
  const client = useApolloClient()

  const [pokemon1Id, setPokemon1Id] = useState(Number(id || 1))
  const [pokemon2Id, setPokemon2Id] = useState(25) // Default to Pikachu

  const { data: data1, loading: loading1 } = usePokemonData(pokemon1Id)
  const { data: data2, loading: loading2 } = usePokemonData(pokemon2Id)

  const [showSearch1, setShowSearch1] = useState(false)
  const [showSearch2, setShowSearch2] = useState(false)

  const pokemon1 = data1?.pokemon_v2_pokemon_by_pk
  const pokemon2 = data2?.pokemon_v2_pokemon_by_pk

  const mainType1 = pokemon1?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name
  const mainType2 = pokemon2?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name

  const color1 = mainType1 ? colors.type[mainType1] : colors.tint
  const color2 = mainType2 ? colors.type[mainType2] : colors.tint

  const specs1 = useMemo(() => getSpecs(pokemon1), [pokemon1])
  const specs2 = useMemo(() => getSpecs(pokemon2), [pokemon2])

  const stats1 = pokemon1?.pokemon_v2_pokemonstats ?? []
  const stats2 = pokemon2?.pokemon_v2_pokemonstats ?? []

  useEffect(() => {
    const prefetchAdjacent = async () => {
      const ids = [
        pokemon1Id - 1,
        pokemon1Id + 1,
        pokemon2Id - 1,
        pokemon2Id + 1,
      ].filter((id) => id > 0 && id <= MAX_POKEMON)

      await Promise.all(
        ids.map((id) =>
          client.query({
            query: GET_POKEMON_BY_ID,
            variables: { id },
            fetchPolicy: 'cache-first',
          })
        )
      )
    }
    prefetchAdjacent()
  }, [pokemon1Id, pokemon2Id])

  if (!pokemon1 && !pokemon2) {
    return (
      <RootView style={styles.centeredContainer}>
        <PokeSpinner />
      </RootView>
    )
  }

  return (
    <RootView style={styles.container}>
      <ScrollView>
        <View style={styles.headerWrapper}>
          <Pressable onPress={router.back}>
            <MaterialIcons
              name="play-arrow"
              size={24}
              color={colors.textContrast}
              style={{ transform: [{ rotateY: '180deg' }] }}
            />
          </Pressable>
          <MonoText
            style={[styles.title, { color: colors.textContrast }]}
            weight="bold"
          >
            Compare Pokémon
          </MonoText>
        </View>

        <Card style={styles.comparisonContainer}>
          <PokemonColumn
            pokemon={pokemon1}
            color={color1}
            id={pokemon1Id}
            specs={specs1}
            stats={stats1}
            comparisonStat={pokemon2?.pokemon_v2_pokemonstats}
            comparisonColor={color2}
            onPrev={() => setPokemon1Id(Math.max(1, pokemon1Id - 1))}
            onNext={() => setPokemon1Id(Math.min(MAX_POKEMON, pokemon1Id + 1))}
            onButtonSearch={() => setShowSearch1(true)}
            loading={loading1}
          />

          <View style={[styles.divider, { backgroundColor: colors.primary }]} />

          <PokemonColumn
            pokemon={pokemon2}
            color={color2}
            id={pokemon2Id}
            specs={specs2}
            stats={stats2}
            comparisonStat={pokemon1?.pokemon_v2_pokemonstats}
            comparisonColor={color1}
            onPrev={() => setPokemon2Id(Math.max(1, pokemon2Id - 1))}
            onNext={() => setPokemon2Id(Math.min(MAX_POKEMON, pokemon2Id + 1))}
            onButtonSearch={() => setShowSearch2(true)}
            loading={loading2}
          />
        </Card>
      </ScrollView>
      <SearchModal
        visible={showSearch1}
        onClose={() => setShowSearch1(false)}
        onSelect={(id) => setPokemon1Id(id)}
      />
      <SearchModal
        visible={showSearch2}
        onClose={() => setShowSearch2(false)}
        onSelect={(id) => setPokemon2Id(id)}
      />
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 20, marginLeft: 4 },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pokemonColumn: { flex: 1, alignItems: 'center' },
  pokemonHeader: { alignItems: 'center', marginBottom: 16 },
  pokemonName: { fontSize: 18, textTransform: 'capitalize' },
  typesWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  specsWrapper: { gap: 8, marginBottom: 16, width: '100%' },
  stats: { width: '100%', gap: 8 },
  divider: { width: 1, height: '100%', marginHorizontal: 20 },
  selectionControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 8,
  },
  selectionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default PokemonCompareScreen
