import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import { PokemonTypes } from '@/libs/types'
import MonoText from './shared/MonoText'

export interface dropdownOption {
  label: string
  value: string
}

interface Props {
  options: dropdownOption[]
  selectedValue: string
  onValueChange: (value: string) => void
  type: 'sort' | 'filter'
}

export const Dropdown = ({
  options,
  selectedValue,
  onValueChange,
  type,
}: Props) => {
  const colors = useThemeColor()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const onClose = () => setIsDropdownOpen(false)

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <MaterialIcons
          name={type === 'sort' ? 'swap-vert' : 'filter-alt'}
          size={16}
          color={colors.primary}
        />
      </TouchableOpacity>

      {isDropdownOpen && (
        <Modal
          transparent
          onRequestClose={onClose}
          visible={isDropdownOpen}
          animationType="fade"
        >
          <Pressable style={styles.backdrop} onPress={onClose}></Pressable>

          <View style={styles.dropdownOptions}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.dropdownOption,
                    item.value === selectedValue && {
                      backgroundColor:
                        type === 'filter'
                          ? `${
                              colors.type[item.value as unknown as PokemonTypes]
                            }30`
                          : `${colors.type['all']}30`,
                    },
                  ]}
                  onPress={() => {
                    onValueChange(item.value)
                    setIsDropdownOpen(false)
                  }}
                >
                  <MonoText
                    style={[
                      styles.dropdownOptionText,
                      item.value === selectedValue && { fontSize: 24 },
                      type === 'filter' && {
                        color:
                          colors.type[item.value as unknown as PokemonTypes],
                      },
                    ]}
                    weight={item.value === selectedValue ? 'bold' : 'regular'}
                  >
                    {item.label}
                  </MonoText>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 32,
    borderRadius: 8,
    width: 32,
  },
  dropdownOptions: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxHeight: 500,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  dropdownOption: {
    padding: 18,
  },
  dropdownOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})
