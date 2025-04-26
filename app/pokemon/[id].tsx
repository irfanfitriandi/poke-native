import { useQuery } from '@apollo/client'
import { Audio } from 'expo-av'
import { router, useLocalSearchParams } from 'expo-router'
import { AnimatePresence } from 'moti'
import React, {
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { TabView, type Route } from 'react-native-tab-view'

import AppearFromBottom from '@/components/animation/AppearFromBottom'
import FadingImage from '@/components/FadingImage'
import RootView from '@/components/layout/RootView'
import PokemonSpecs from '@/components/pokemon/PokemonSpecs'
import PokemonStats from '@/components/pokemon/PokemonStats'
import PokemonTypeBadge from '@/components/pokemon/PokemonTypeBadge'
import Card from '@/components/shared/Card'
import MonoText from '@/components/shared/MonoText'
import { useThemeColor } from '@/hooks/useThemeColor'
import {
  formatFlavorText,
  formatHeight,
  formatWeight,
  getPokemonArtwork,
  getPokemonNumber,
} from '@/libs/helpers'
import { GET_POKEMON_BY_ID } from '@/libs/queries'
import { type Pokemon } from '@/libs/types'

interface PokemonRoute extends Route {
  id: number
  onNext: () => void
  onPrevious: () => void
}

const lastPokemon = 151
const firstPokemon = 1

const PokemonDetailScreen = () => {
  const { id: idParam } = useLocalSearchParams<{ id: string }>()
  const layout = useWindowDimensions()
  const [id, setId] = useState(() => parseInt(idParam, 10))
  const [index, setIndex] = useState(1)

  const createRoute = useCallback(
    (newId: number): PokemonRoute => ({
      key: newId.toString(),
      id: newId,
      title: newId.toString(),
      onNext: () => setIndex((prev) => prev + 1),
      onPrevious: () => setIndex((prev) => prev - 1),
    }),
    []
  )

  const routes = useMemo(
    () => [createRoute(id - 1), createRoute(id), createRoute(id + 1)],
    [id, createRoute]
  )

  const handleAnimationEnd = useCallback(() => {
    if (
      index === 1 ||
      (index === 0 && id === firstPokemon + 1) ||
      (index === 2 && id === lastPokemon - 1)
    ) {
      return
    }
    setId((prevId) => prevId + (index - 1))
  }, [id, index])

  const renderScene = useCallback(
    ({ route }: { route: PokemonRoute }) => (
      <PokemonView
        id={route.id}
        onPrevious={route.onPrevious}
        onNext={route.onNext}
      />
    ),
    []
  )

  return (
    <TabView<PokemonRoute>
      renderTabBar={() => null}
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
      onSwipeEnd={handleAnimationEnd}
    />
  )
}

interface Props {
  id: number
  onPrevious: () => void
  onNext: () => void
}

const PokemonView = memo(({ id, onPrevious, onNext }: Props) => {
  const colors = useThemeColor()

  const { data } = useQuery<{ pokemon_v2_pokemon_by_pk: Pokemon }>(
    GET_POKEMON_BY_ID,
    {
      variables: { id },
      notifyOnNetworkStatusChange: true,
    }
  )

  const pokemon = data?.pokemon_v2_pokemon_by_pk

  const mainType = pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name
  const colorType = mainType
    ? (colors.type as Record<string, string>)[mainType]
    : colors.tint

  const specs = useMemo(
    () => [
      {
        name: 'Weight',
        image: require('@/assets/images/weight.png'),
        spec: formatWeight(pokemon?.weight),
      },
      {
        name: 'Height',
        image: require('@/assets/images/ruler.png'),
        spec: formatHeight(pokemon?.height),
      },
      {
        name: 'Ability',
        image: require('@/assets/images/brain.png'),
        spec:
          pokemon?.pokemon_v2_pokemonabilities[0]?.pokemon_v2_ability.name ??
          'Unknown',
      },
    ],
    [pokemon]
  )

  const specy = useMemo(
    () =>
      formatFlavorText(
        pokemon?.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0]
          ?.flavor_text
      ),
    [pokemon]
  )

  const onCry = useCallback(async () => {
    const cryUri = pokemon?.pokemon_v2_pokemoncries[0]?.cries.latest
    if (!cryUri) return

    const { sound } = await Audio.Sound.createAsync(
      { uri: cryUri },
      { shouldPlay: true }
    )
    await sound.playAsync()
  }, [pokemon])

  if (!pokemon) {
    return (
      <RootView style={styles.centeredContainer}>
        <ActivityIndicator color={colors.tint} size="large" />
      </RootView>
    )
  }

  return (
    <RootView style={styles.container} color={colorType}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.backWrapper}>
          <Pressable onPress={router.back}>
            <Image
              style={styles.backIcon}
              source={require('@/assets/images/arrow.png')}
            />
          </Pressable>
          <MonoText
            style={[styles.pokemonName, { color: colors.textContrast }]}
            weight="bold"
          >
            {pokemon.name}
          </MonoText>
        </View>
        <MonoText style={{ color: colors.textContrast }}>
          {getPokemonNumber(id)}
        </MonoText>
      </View>

      {/* Body */}
      <View style={styles.bodyWrapper}>
        <Image
          style={styles.pokeballBg}
          source={require('@/assets/images/pokeball-big.png')}
        />

        <Card style={styles.cardBody}>
          <View style={styles.imageRow}>
            {id > firstPokemon ? (
              <Pressable onPress={onPrevious}>
                <Image
                  source={require('@/assets/images/chevron.png')}
                  style={styles.chevron}
                />
              </Pressable>
            ) : (
              <View style={styles.chevronPlaceholder} />
            )}

            <Pressable onPress={onCry} style={styles.imagePokemon}>
              <FadingImage
                url={getPokemonArtwork(id)}
                width={200}
                height={200}
              />
              <MonoText
                style={[styles.tapToCryText, { color: colorType }]}
                weight="bold"
              >
                Tap me!
              </MonoText>
            </Pressable>

            {id < lastPokemon ? (
              <Pressable onPress={onNext}>
                <Image
                  source={require('@/assets/images/chevron.png')}
                  style={[styles.chevron, styles.chevronFlipped]}
                />
              </Pressable>
            ) : (
              <View style={styles.chevronPlaceholder} />
            )}
          </View>

          <View style={styles.stack}>
            {/* Types */}
            <View style={styles.typesWrapper}>
              {pokemon.pokemon_v2_pokemontypes.map((type) => (
                <PokemonTypeBadge
                  key={type.pokemon_v2_type.name}
                  type={type.pokemon_v2_type.name}
                />
              ))}
            </View>

            {/* Specs */}
            <TitleSection color={colorType}>About</TitleSection>
            <View style={styles.specsWrapper}>
              <AnimatePresence>
                {specs.map((spec, index) => (
                  <AppearFromBottom
                    key={spec.name}
                    style={index > 0 ? styles.specSeparator : undefined}
                    index={index}
                  >
                    <PokemonSpecs {...spec} />
                  </AppearFromBottom>
                ))}
              </AnimatePresence>
            </View>

            <View style={styles.specyWrapper}>
              <MonoText variant="caption">{specy}</MonoText>
            </View>

            {/* Stats */}
            <TitleSection color={colorType}>Base Stats</TitleSection>
            <View style={styles.stats}>
              {pokemon.pokemon_v2_pokemonstats.map((stat) => (
                <PokemonStats
                  key={stat.pokemon_v2_stat.name}
                  name={stat.pokemon_v2_stat.name}
                  value={stat.base_stat}
                  color={colorType}
                />
              ))}
            </View>
          </View>
        </Card>
      </View>
    </RootView>
  )
})

const TitleSection = memo(
  ({ color, children }: PropsWithChildren<{ color: string }>) => (
    <Text style={{ color, textAlign: 'center', fontWeight: '700' }}>
      {children}
    </Text>
  )
)

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'stretch' },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backWrapper: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { width: 32, height: 32 },
  pokemonName: { fontSize: 24, textTransform: 'capitalize' },
  bodyWrapper: { justifyContent: 'flex-start' },
  pokeballBg: {
    position: 'absolute',
    top: -80,
    right: 8,
    width: 208,
    height: 208,
  },
  cardBody: {
    marginTop: 140,
    paddingTop: 60,
    padding: 20,
    alignItems: 'stretch',
  },
  imageRow: {
    position: 'absolute',
    top: -140,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  chevron: { width: 24, height: 24 },
  chevronFlipped: { transform: [{ rotateY: '180deg' }] },
  chevronPlaceholder: { width: 24 },
  imagePokemon: { alignSelf: 'center', justifyContent: 'center' },
  typesWrapper: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  specsWrapper: { flexDirection: 'row', height: 48, alignItems: 'center' },
  specSeparator: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    paddingLeft: 8,
  },
  stack: { gap: 16 },
  specyWrapper: {},
  stats: { alignSelf: 'stretch' },
  tapToCryText: {
    position: 'absolute',
    bottom: 0,
    right: -40,
    fontSize: 24,
    transform: [{ rotate: '-15deg' }],
  },
})

export default PokemonDetailScreen
