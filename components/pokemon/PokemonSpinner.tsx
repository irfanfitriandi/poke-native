import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

const PokeSpinner = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pokeball, { transform: [{ rotate }] }]}>
        <View style={styles.halfTop} />
        <View style={styles.halfBottom} />
        <View style={styles.centerLine} />
        <View style={styles.centerCircleOuter}>
          <View style={styles.centerCircleInner} />
        </View>
      </Animated.View>
    </View>
  )
}

export default PokeSpinner

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'black',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  halfTop: {
    position: 'absolute',
    top: 0,
    height: '50%',
    width: '100%',
    backgroundColor: '#EE1515',
  },
  halfBottom: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: '100%',
    backgroundColor: 'white',
  },
  centerLine: {
    position: 'absolute',
    top: '48%',
    height: '4%',
    width: '100%',
    backgroundColor: 'black',
  },
  centerCircleOuter: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
  },
})
