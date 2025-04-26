const tintColor = '#CC0000'

export const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
} as const

const shared = {
  tint: tintColor,
  primary: tintColor,
  accent: '#FFCB05',
  type: typeColors,
}

export const Colors = {
  light: {
    ...shared,
    secondary: '#0077B6',

    background: '#F7F7F7',
    surface: '#FFFFFF',
    card: '#FAFAFA',
    border: '#DADADA',

    text: '#212121',
    textContrast: '#FFFFFF',
    mutedText: '#666666',

    grayLight: '#E0E0E0',
    grayBackground: '#EFEFEF',

    status: {
      success: '#2ECC71',
      warning: '#F1C40F',
      error: '#E74C3C',
    },
  },

  dark: {
    ...shared,
    secondary: '#90CAF9',

    background: '#121212',
    surface: '#1E1E1E',
    card: '#1C1C1C',
    border: '#333333',

    text: '#FFFFFF',
    textContrast: '#212121',
    mutedText: '#AAAAAA',

    status: {
      success: '#27AE60',
      warning: '#F39C12',
      error: '#C0392B',
    },
  },
}
