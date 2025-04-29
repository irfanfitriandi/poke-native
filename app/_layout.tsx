import { ApolloProvider } from '@apollo/client'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { useLoadFonts } from '@/hooks/useLoadFont'
import { useThemeColor } from '@/hooks/useThemeColor'
import { apolloClient } from '@/libs/apolloClient'

// Handle splash immediately
SplashScreen.preventAutoHideAsync().catch(console.warn)

export default function RootLayout() {
  const color = useThemeColor()
  const [fontsLoaded] = useLoadFonts()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        if (fontsLoaded) {
          await SplashScreen.hideAsync()
          setIsReady(true)
        }
      } catch (error) {
        console.warn('Splash screen preparation error:', error)
        await SplashScreen.hideAsync()
        setIsReady(true)
      }
    }

    prepare()
  }, [fontsLoaded])

  if (!isReady) {
    return (
      <View
        style={[styles.splashContainer, { backgroundColor: 'transparent' }]}
      >
        <ActivityIndicator size="large" color={color.tint} />
      </View>
    )
  }

  return (
    <ApolloProvider client={apolloClient}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="pokemon/[id]" />
        <Stack.Screen name="pokemon/compare/[id]" />
      </Stack>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
