import { StyleSheet, View } from 'react-native'

import { typeColors } from '@/constants/colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { PokemonTypes } from '@/libs/types'
import MonoText from '../shared/MonoText'

interface Props {
  type: PokemonTypes
}

const PokemonTypeBadge = ({ type }: Props) => {
  const colors = useThemeColor()
  const colorKey = type.toLowerCase() as keyof typeof typeColors
  const backgroundColor = colors.type[colorKey] ?? '#ccc'

  return (
    <View style={[styles.badgeContainer, { backgroundColor }]}>
      <MonoText weight="bold" style={styles.badgeText}>
        {type}
      </MonoText>
    </View>
  )
}

const styles = StyleSheet.create({
  badgeContainer: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    textTransform: 'capitalize',
  },
})

export default PokemonTypeBadge
