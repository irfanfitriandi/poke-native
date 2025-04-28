import { useState } from 'react'
import { type ImageProps } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'

interface Props extends ImageProps {
  url: string
}

const FadingImage = ({ style, url, ...rest }: Props) => {
  const [imageError, setImageError] = useState(false)
  const opacity = useSharedValue(0)
  const onLoad = () => {
    opacity.value = withTiming(1, { duration: 300 })
  }

  return (
    <Animated.Image
      source={
        imageError
          ? require('@/assets/images/pokeball-color.png')
          : { uri: url }
      }
      style={[
        style,
        { opacity: opacity },
        imageError && { width: 180, height: 180, marginTop: 24 },
      ]}
      onLoadEnd={onLoad}
      onError={() => setImageError(true)}
      defaultSource={require('@/assets/images/pokeball-color.png')}
      {...rest}
    />
  )
}

export default FadingImage
