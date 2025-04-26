/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/colors'

export function useThemeColor() {
  // const theme = useColorScheme() ?? 'light'
  const theme = 'light'

  return Colors[theme]
}
