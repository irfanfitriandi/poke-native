import { StyleSheet, View } from 'react-native'

import { typeColors } from '@/constants/colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { PokemonTypes } from '@/libs/types'
import MonoText from '../shared/MonoText'

type Props = {
  type: PokemonTypes
}

const isPokemonType = (type: string): type is PokemonTypes => {
  return type in typeColors
}

const PokemonTypeBadge = ({ type }: Props) => {
  const colors = useThemeColor()
  const lowerType = type.toLowerCase()
  const backgroundColor = isPokemonType(lowerType)
    ? colors.type[lowerType]
    : '#ccc'

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
