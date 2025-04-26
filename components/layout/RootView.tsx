import { MotiView } from 'moti'
import type { PropsWithChildren } from 'react'
import { StyleSheet, type ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useThemeColor } from '@/hooks/useThemeColor'

const RootView = ({
  children,
  style,
  color,
  ...rest
}: PropsWithChildren<ViewProps & { color?: string }>) => {
  const colors = useThemeColor()
  const bgColor = color ?? colors.tint

  return (
    <MotiView
      animate={{ backgroundColor: bgColor }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.outer}
    >
      <SafeAreaView style={[styles.container, style]} {...rest}>
        {children}
      </SafeAreaView>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 4,
  },
})

export default RootView
