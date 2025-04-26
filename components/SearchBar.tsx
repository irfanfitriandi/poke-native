import { Colors } from '@/constants/colors'
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'

type Props = {
  search: string
  onChange: (s: string) => void
}

const SearchBar = ({ search, onChange }: Props) => {
  const hasSearch = search !== ''

  const emptySearch = () => {
    onChange('')
  }

  return (
    <View style={styles.wrapper}>
      <Image
        source={require('../assets/images/search.png')}
        width={16}
        height={16}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={search}
        placeholder="Search"
        placeholderTextColor={Colors.light.mutedText}
      />
      {hasSearch && (
        <Pressable onPress={emptySearch} style={styles.clearButton}>
          <Image
            source={require('../assets/images/close.png')}
            width={16}
            height={16}
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
