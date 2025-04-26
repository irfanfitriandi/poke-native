import { useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native'

import RootView from '@/components/layout/RootView'
import PokemonCard from '@/components/pokemon/PokemonCard'
import SearchBar from '@/components/SearchBar'
import Card from '@/components/shared/Card'
import MonoText from '@/components/shared/MonoText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { debounce } from '@/libs/helpers'
import { GET_POKEMON_LIST } from '@/libs/queries'
import { Pokemon } from '@/libs/types'

const EmptyListMessage = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <MonoText>No Pokémon found.</MonoText>
    </View>
  )
}

export default function App() {
  const colors = useThemeColor()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const debouncedSetSearch = useMemo(
    () => debounce((text: string) => setDebouncedSearch(text), 300),
    []
  )

  const { data, loading, error, fetchMore } = useQuery<{
    pokemon_v2_pokemon: Pokemon[]
  }>(GET_POKEMON_LIST, {
    variables: { offset: 0, limit: 60 },
    notifyOnNetworkStatusChange: true,
  })

  const handleSearch = (text: string) => {
    setSearch(text)
    debouncedSetSearch(text)
  }

  const debouncedOnEnd = useMemo(
    () =>
      debounce(() => {
        if (!loading && data?.pokemon_v2_pokemon && !debouncedSearch) {
          fetchMore({
            variables: {
              offset: data.pokemon_v2_pokemon.length,
              limit: 60,
            },
            updateQuery: (prev, { fetchMoreResult }) => ({
              pokemon_v2_pokemon: [
                ...prev.pokemon_v2_pokemon,
                ...(fetchMoreResult?.pokemon_v2_pokemon ?? []),
              ],
            }),
          })
        }
      }, 300),
    [data?.pokemon_v2_pokemon.length, debouncedSearch, loading, fetchMore]
  )

  const filteredData = useMemo(() => {
    if (!data?.pokemon_v2_pokemon) return []

    if (!debouncedSearch) return data.pokemon_v2_pokemon

    const searchLower = debouncedSearch.toLowerCase()
    return data.pokemon_v2_pokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchLower)
    )
  }, [data?.pokemon_v2_pokemon, debouncedSearch])

  if (loading && !data) {
    return (
      <RootView>
        <ActivityIndicator size="large" color={colors.tint} />
      </RootView>
    )
  }

  if (error) {
    return (
      <RootView>
        <MonoText>Error: {error.message}</MonoText>
      </RootView>
    )
  }

  return (
    <RootView>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/pokedex.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <SearchBar search={search} onChange={handleSearch} />
      </View>

      <Card style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          numColumns={3}
          contentContainerStyle={[
            styles.list,
            styles.gap,
            { backgroundColor: colors.surface },
          ]}
          columnWrapperStyle={styles.gap}
          onEndReached={debouncedSearch ? undefined : debouncedOnEnd}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            !debouncedSearch && loading ? (
              <ActivityIndicator size="small" color={colors.tint} />
            ) : null
          }
          ListEmptyComponent={
            !loading && debouncedSearch ? <EmptyListMessage /> : null
          }
        />
      </Card>
    </RootView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 140,
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  gap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
})
