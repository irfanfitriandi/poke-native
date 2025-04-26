import { useFocusEffect } from 'expo-router'
import { MotiView } from 'moti'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'

import { useThemeColor } from '@/hooks/useThemeColor'

const ColorContext = createContext({
  setBackground: (color: string) => {},
})

export const ColoredView = (props: PropsWithChildren) => {
  const colors = useThemeColor()
  const [background, setBackground] = useState(colors.tint)

  return (
    <ColorContext.Provider value={{ setBackground }}>
      <MotiView
        style={[{ flex: 1 }]}
        animate={{ backgroundColor: background }}
        {...props}
      />
    </ColorContext.Provider>
  )
}

export const useBackgroundColor = (newColor: string | undefined) => {
  const { setBackground } = useContext(ColorContext)
  useFocusEffect(
    useCallback(() => {
      if (newColor) {
        setBackground(newColor)
      }
    }, [newColor, setBackground])
  )
}
