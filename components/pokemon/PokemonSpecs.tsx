import { MaterialIcons } from '@expo/vector-icons'
import { usePathname } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import MonoText from '../shared/MonoText'

interface Props {
  spec: string
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
  color: string
}

const PokemonSpecs = ({ spec, name, icon, color }: Props) => {
  const pathname = usePathname().split('/')[2]

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialIcons
          name={icon}
          size={24}
          color={color}
          style={{
            transform: name === 'Height' ? [{ rotate: '90deg' }] : '',
          }}
        />

        <MonoText style={styles.specText}>{spec}</MonoText>
      </View>
      <Text style={[styles.nameText, { color: color }]}>
        {pathname === 'compare' ? '' : name}
      </Text>
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
