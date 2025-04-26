import { Colors } from '@/constants/colors'
import { useCallback } from 'react'
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'

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
      <Image
        source={require('../assets/images/search.png')}
        style={styles.icon}
        accessible={true}
        accessibilityLabel="Search"
      />
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
          <Image
            source={require('../assets/images/close.png')}
            style={styles.icon}
          />
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
  icon: {
    width: 16,
    height: 16,
  },
  clearButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SearchBar
