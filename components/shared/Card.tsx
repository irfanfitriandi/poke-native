import { StyleSheet, View, type ViewProps } from 'react-native'

import { Shadows } from '@/constants/shadows'
import { useThemeColor } from '@/hooks/useThemeColor'

type Props = ViewProps & {
  elevation?: number
}

const Card = ({ elevation = 2, style, ...rest }: Props) => {
  const colors = useThemeColor()

  return (
    <View
      style={[styles.card, style, { backgroundColor: colors.surface }]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 8,
    ...Shadows.dp2,
  },
})

export default Card
