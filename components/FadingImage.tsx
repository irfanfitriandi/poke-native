import { type ImageProps } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'

interface Props extends ImageProps {
  url: string
}

const FadingImage = ({ style, url, ...rest }: Props) => {
  const opacity = useSharedValue(0)
  const onLoad = () => {
    opacity.value = withTiming(1, { duration: 300 })
  }

  return (
    <Animated.Image
      source={{ uri: url }}
      style={[style, { opacity: opacity }]}
      onLoadEnd={onLoad}
      {...rest}
    />
  )
}

export default FadingImage
