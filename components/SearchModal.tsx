import { useThemeColor } from '@/hooks/useThemeColor'
import { debounce, getPokemonNumber } from '@/libs/helpers'
import { GET_POKEMON_LIST } from '@/libs/queries'
import { Pokemon } from '@/libs/types'
import { useQuery } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import EmptyListMessage from './EmptyListMessage'
import SearchBar from './SearchBar'
import MonoText from './shared/MonoText'

interface Props {
  visible: boolean
  onClose: () => void
  onSelect: (id: number) => void
}

const SearchModal = ({ visible, onClose, onSelect }: Props) => {
  const colors = useThemeColor()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const debouncedSetSearch = useMemo(
    () => debounce((text: string) => setDebouncedSearch(text), 500),
    []
  )
  const { data, loading, fetchMore } = useQuery<{
    pokemon_v2_pokemon: Pokemon[]
  }>(GET_POKEMON_LIST, {
    variables: {
      offset: 0,
      limit: 21,
      search: debouncedSearch ? `%${debouncedSearch}%` : '%%',
      where: {
        pokemon_v2_pokemontypes: undefined,
      },
      notifyOnNetworkStatusChange: true,
    },
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

  const filtered = data?.pokemon_v2_pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={{ position: 'relative' }}>
      <Modal visible={visible} animationType="slide" transparent>
        <Pressable style={styles.backdrop} onPress={onClose}></Pressable>

        <View style={styles.container}>
          <View style={{ paddingVertical: 12 }}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MonoText
                style={{
                  color: colors.primary,
                }}
                weight="bold"
              >
                Close
              </MonoText>
              <MaterialIcons name="close" size={20} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.searchContainer}>
            <SearchBar
              value={search}
              onChange={handleSearch}
              style={{ borderColor: colors.primary, borderWidth: 1 }}
            />

            {loading ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="small" color={colors.tint} />
              </View>
            ) : (
              <FlatList
                data={filtered}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      onSelect(item.id)
                      onClose()
                    }}
                  >
                    <MonoText
                      style={{
                        color: colors.secondary,
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.name}
                    </MonoText>
                    <MonoText variant="caption">
                      {getPokemonNumber(item.id)}
                    </MonoText>
                  </Pressable>
                )}
                onEndReached={debouncedSearch ? undefined : debouncedOnEnd}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={
                  !loading && debouncedSearch ? <EmptyListMessage /> : null
                }
                initialNumToRender={15}
                maxToRenderPerBatch={15}
                windowSize={21}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: '90%',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  searchContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  closeButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: 2,
  },
})

export default SearchModal
