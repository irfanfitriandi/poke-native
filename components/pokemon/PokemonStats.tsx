import { MotiView } from 'moti'
import { StyleSheet, Text, View } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import MonoText from '../shared/MonoText'

interface Props {
  name: string
  value: number
  color: string
}

const PokemonStats = ({ name, value, color }: Props) => {
  const colors = useThemeColor()

  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={{ color }}>{statShortName(name)}</Text>
      </View>

      <View style={styles.statsWrapper}>
        <MonoText variant="caption" style={{ color: colors.text }}>
          {value.toString().padStart(3, '0')}
        </MonoText>

        <View style={styles.barWrapper}>
          <View
            style={[
              styles.barBackground,
              { backgroundColor: color, opacity: 0.24 },
            ]}
          />
          <MotiView
            style={[styles.barFill, { backgroundColor: color }]}
            animate={{
              width: `${(value / 255) * 100}%`,
            }}
            transition={{
              type: 'timing',
              duration: 1000,
            }}
          />
        </View>
      </View>
    </View>
  )
}

const statShortName = (name: string): string => {
  return name
    .replaceAll('special', 'S')
    .replaceAll('-', '')
    .replaceAll('attack', 'ATK')
    .replaceAll('defense', 'DEF')
    .replaceAll('speed', 'SPD')
    .toUpperCase()
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  name: {
    width: 32,
  },
  statsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    gap: 8,
    flex: 1,
  },
  barWrapper: {
    flex: 1,
    height: 4,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  barBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  barFill: {
    position: 'absolute',
    height: '100%',
    borderRadius: 20,
    left: 0,
    top: 0,
  },
})

export default PokemonStats
