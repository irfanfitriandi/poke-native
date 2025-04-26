import type { ViewStyle } from 'react-native'

export const Shadows = {
  dp1: {
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  dp2: {
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  dp4: {
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
} satisfies Record<string, ViewStyle>
