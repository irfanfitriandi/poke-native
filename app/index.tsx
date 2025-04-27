import { useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native'

import { Dropdown, dropdownOption } from '@/components/Dropdown'
import RootView from '@/components/layout/RootView'
import PokemonCard from '@/components/pokemon/PokemonCard'
import PokeSpinner from '@/components/pokemon/PokemonSpinner'
import SearchBar from '@/components/SearchBar'
import Card from '@/components/shared/Card'
import MonoText from '@/components/shared/MonoText'
import { sortOptions, typeOptions } from '@/constants/options'
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
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState<dropdownOption>({
    label: 'Pokémon ID',
    value: 'id',
  })

  const debouncedSetSearch = useMemo(
    () => debounce((text: string) => setDebouncedSearch(text), 500),
    []
  )

  const { data, loading, error, fetchMore } = useQuery<{
    pokemon_v2_pokemon: Pokemon[]
  }>(GET_POKEMON_LIST, {
    variables: {
      offset: 0,
      limit: 21,
      search: debouncedSearch ? `%${debouncedSearch}%` : '%%',
      orderBy:
        sortBy.value === 'name'
          ? { name: 'asc' }
          : sortBy.value === 'id'
          ? { id: 'asc' }
          : undefined,
      where: {
        pokemon_v2_pokemontypes:
          selectedType === 'all'
            ? undefined
            : { pokemon_v2_type: { name: { _eq: selectedType } } },
      },
    },
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
      }, 500),
    [data?.pokemon_v2_pokemon.length, debouncedSearch, loading, fetchMore]
  )

  const filteredData = data?.pokemon_v2_pokemon || []

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
        <View style={styles.searchContainer}>
          <SearchBar search={search} onChange={handleSearch} />
          <Dropdown
            type="sort"
            options={sortOptions}
            selectedValue={sortBy.value}
            onValueChange={(value) =>
              setSortBy(sortOptions.find((opt) => opt.value === value)!)
            }
          />
          <Dropdown
            type="filter"
            options={typeOptions}
            selectedValue={selectedType}
            onValueChange={(value) => setSelectedType(value)}
          />
        </View>
      </View>

      <Card style={styles.container}>
        {loading && !data?.pokemon_v2_pokemon ? (
          <PokeSpinner />
        ) : (
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
            initialNumToRender={15}
            maxToRenderPerBatch={15}
            windowSize={21}
          />
        )}
      </Card>
    </RootView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
  },
  sortButton: {
    padding: 8,
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
