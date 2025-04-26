import React from 'react'
import { Platform, StyleSheet, Text, TextProps, TextStyle } from 'react-native'

type FontWeight = 'regular' | 'bold'
type Variant = 'default' | 'caption'

interface MonoTextProps extends TextProps {
  variant?: Variant
  weight?: FontWeight
}

const MonoText = ({
  style,
  variant = 'default',
  weight = 'regular',
  ...props
}: MonoTextProps) => {
  return (
    <Text
      {...props}
      style={[
        baseStyle.text,
        weightStyles[weight],
        variantStyles[variant],
        style,
      ]}
    />
  )
}

const baseStyle = StyleSheet.create({
  text: {
    includeFontPadding: Platform.OS === 'android' ? false : undefined,
    textAlignVertical: 'center',
  } as TextStyle,
})

const weightStyles: Record<FontWeight, TextStyle> = {
  regular: { fontFamily: 'SpaceMono-Regular' },
  bold: { fontFamily: 'SpaceMono-Bold' },
}

const variantStyles: Record<Variant, TextStyle> = {
  default: {
    fontSize: 16,
    lineHeight: 20,
    color: '#212121',
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    color: '#666666',
  },
}

export default MonoText
