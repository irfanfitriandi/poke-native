import { View } from 'react-native'
import MonoText from './shared/MonoText'

const EmptyListMessage = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <MonoText>No Pokémon found.</MonoText>
    </View>
  )
}

export default EmptyListMessage
