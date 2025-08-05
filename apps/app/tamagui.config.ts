/** biome-ignore-all assist/source/useSortedKeys: ordering for closeness of token */

import { createAnimations } from '@tamagui/animations-moti'
import { createFont, createTamagui, createTokens } from 'tamagui'

// Shared font metrics (letterSpacing, lineHeight, size, weight)
const fontMetrics = {
  letterSpacing: {
    1: 0,
    2: -0.5,
    3: -1,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
  },
  size: {
    1: 12,
    2: 14,
    3: 16,
    5: 24,
    6: 32,
    7: 48,
    8: 64,
    9: 86,
  },
  weight: {
    1: '300',
    2: '500',
    3: '700',
  },
}

// Define our primary fonts (all free/Open Font License)
export const interFont = createFont({
  family: 'Inter',
  ...fontMetrics,
})

export const robotoFont = createFont({
  family: 'Roboto',
  ...fontMetrics,
})

export const robotoMonoFont = createFont({
  family: 'Roboto Mono',
  ...fontMetrics,
})

export const openSansFont = createFont({
  family: 'Open Sans',
  ...fontMetrics,
})

export const latoFont = createFont({
  family: 'Lato',
  ...fontMetrics,
})

export const poppinsFont = createFont({
  family: 'Poppins',
  ...fontMetrics,
})

export const nunitoFont = createFont({
  family: 'Nunito',
  ...fontMetrics,
})

export const firaCodeFont = createFont({
  family: 'FiraCode',
  ...fontMetrics,
})

// Base size scale
const size = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 38,
  true: 16, // default
}

// Create tokens
export const tokens = createTokens({
  color: {
    none: 'transparent',

    primary: '#5799a2',
    'primary-muted': '#ccd7e9',
    secondary: '#385f71',

    success: '#639fab',
    accent: '#a476ad',
    destructive: '#f87171',
    shadow: '#2b4162',

    foreground: '#333333',
    background: '#ffffff',

    button: '#333333',
    'button-muted': 'transparent',
    'button-muted-pressed': '#f2f7f8',
    'button-active': '#385f71',
    'button-icon': '#385f71',

    surface: '#e0ecee',
    'surface-muted': '#f2f7f8',

    text: '#2b4162',
    'text-muted': '#6b7280',
    'text-on-dark': '#ffffff',
    'text-button': '#ffffff',

    icon: '#2b4162',
    'icon-on-dark': '#ffffff',
    'icon-muted': '#6b7280',

    'field-backround': '#f8fbfb',
    'field-border': '#e0ecee',
    'field-error': '#f87171',
    'field-selected': '#639fab',

    'caribbean-100': '#0d1718',
    'caribbean-200': '#1a2d30',
    'caribbean-300': '#274448',
    'caribbean-400': '#335a5f',
    'caribbean-500': '#407076',
    'caribbean-600': '#5799a2',
    'caribbean-700': '#80b4ba',
    'caribbean-800': '#aacdd1',
    'caribbean-900': '#d5e6e8',

    'indigo-100': '#090d14',
    'indigo-200': '#111a28',
    'indigo-300': '#1a273c',
    'indigo-400': '#23354f',
    'indigo-500': '#2b4162',
    'indigo-600': '#426496',
    'indigo-700': '#6688bc',
    'indigo-800': '#99b0d2',
    'indigo-900': '#ccd7e9',

    'magnolia-100': '#39243d',
    'magnolia-200': '#714979',
    'magnolia-300': '#a476ad',
    'magnolia-400': '#ccb3d1',
    'magnolia-500': '#f5f0f6',
    'magnolia-600': '#f7f2f7',
    'magnolia-700': '#f9f5f9',
    'magnolia-800': '#fbf9fb',
    'magnolia-900': '#fdfcfd',

    'moonstone-100': '#132023',
    'moonstone-200': '#264146',
    'moonstone-300': '#396169',
    'moonstone-400': '#4c828d',
    'moonstone-500': '#639fab',
    'moonstone-600': '#82b2bc',
    'moonstone-700': '#a2c5cd',
    'moonstone-800': '#c1d9dd',
    'moonstone-900': '#e0ecee',

    'paynes-100': '#0b1317',
    'paynes-200': '#16262d',
    'paynes-300': '#213944',
    'paynes-400': '#2c4c5a',
    'paynes-500': '#385f71',
    'paynes-600': '#4e859f',
    'paynes-700': '#76a5bb',
    'paynes-800': '#a3c3d2',
    'paynes-900': '#d1e1e8',
  },
  radius: {
    1: 8,
    2: 12,
    3: 16,
    true: 8,
  },
  size,
  space: size,
  zIndex: {
    1: 1000,
    2: 2000,
    3: 3000,
    true: 1000,
  },
})

const config = createTamagui({
  animations: createAnimations({
    fast: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
      type: 'spring',
    },
    medium: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
      type: 'spring',
    },
    slow: {
      damping: 20,
      stiffness: 60,
      type: 'spring',
    },
  }),

  defaultTheme: 'light',

  fonts: {
    alt1: openSansFont,
    alt2: latoFont,
    'heading-sm': latoFont,
    alt3: nunitoFont,
    mono: robotoMonoFont,
    body: firaCodeFont,
    display: poppinsFont,
    heading: poppinsFont,
    ui: robotoFont,
  },
  layers: {
    base: 0,
    content: 1,
    modal: 1000,
    overlay: 100,
    toast: 10000,
  },
  media: {
    gtSm: { minWidth: 861 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
    short: { maxHeight: 820 },
    sm: { maxWidth: 860 },
  },

  shorthands: {
    bg: 'backgroundColor',
    c: 'color',
    f: 'flex',
    fg: 'flexGrow',
    fs: 'flexShrink',
    h: 'height',
    m: 'margin',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    mt: 'marginTop',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    p: 'padding',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    pt: 'paddingTop',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    w: 'width',
  } as const,
  themes: {
    // dark: {
    //   bg: tokens.color['background-dark'],
    //   color: tokens.color['foreground-dark'],
    // },
    light: {
      ...tokens.color,
      bg: tokens.color.background,
      color: tokens.color.foreground,
    },
  },
  tokens,
})

type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
