import React from 'react'
import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import MonoText from '../shared/MonoText'

interface Props {
  spec?: string
  name: string
  image?: ImageSourcePropType
}

const PokemonSpecs = ({ spec, name, image }: Props) => {
  const colors = useThemeColor()

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {image && <Image source={image} style={styles.icon} />}
        {spec && <MonoText style={styles.specText}>{spec}</MonoText>}
      </View>
      <Text style={[styles.nameText, { color: colors.mutedText }]}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  icon: {
    width: 16,
    height: 16,
  },
  specText: {
    textTransform: 'uppercase',
    fontSize: 10,
  },
  nameText: {
    fontSize: 10,
  },
})

export default PokemonSpecs
