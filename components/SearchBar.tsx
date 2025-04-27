import { MaterialIcons } from '@expo/vector-icons'
import { useCallback } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'

import { Colors } from '@/constants/colors'

interface Props {
  search: string
  onChange: (s: string) => void
}

const SearchBar = ({ search, onChange }: Props) => {
  const hasSearch = search !== ''

  const emptySearch = useCallback(() => {
    onChange('')
  }, [onChange])

  return (
    <View style={styles.wrapper}>
      <MaterialIcons name="search" size={16} color={Colors.light.primary} />
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={search}
        placeholder="Search"
        placeholderTextColor={Colors.light.mutedText}
        accessible={true}
        accessibilityLabel="Search input"
      />
      {hasSearch && (
        <Pressable
          onPress={emptySearch}
          style={styles.clearButton}
          accessible={true}
          accessibilityLabel="Clear search"
        >
          <MaterialIcons name="close" size={16} color={Colors.light.primary} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
    gap: 2,
    width: '100%',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.text,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  clearButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SearchBar
