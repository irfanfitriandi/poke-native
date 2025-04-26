import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
})

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'SpaceMono-Bold': require('../assets/fonts/SpaceMono-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="pokemon/[id]" />
        </Stack>
        <StatusBar style="auto" />
      </ApolloProvider>
    </ThemeProvider>
  )
}
