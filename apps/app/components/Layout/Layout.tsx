import type React from 'react'

import { motify } from 'moti'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styled, View } from 'tamagui'

import { KeyboardAware } from './AvoidKeyboard'
import { ScrollLayout } from './ScrollLayout'

export const Layout = styled(View, {
  borderColor: '$primary-muted',
  name: 'Layout',

  variants: {
    center: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    circle: {
      true: {
        borderRadius: 100_000_000,
      },
    },
    d: {
      true: {
        backgroundColor: 'lightsalmon',
        borderColor: 'red',
        borderStyle: 'dashed',
        borderWidth: 1,
      },
    },
    diameter: {
      ':number': (value) => ({ borderRadius: 100_000_000, h: value, w: value }),
    },
    elevation: {
      high: {
        elevation: 8,
        shadowColor: '$shadow',
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6.0, // Android
      },
      low: {
        elevation: 1,
        shadowColor: '$shadow',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 1.0, // Android
      },
      medium: {
        elevation: 4,
        shadowColor: '$shadow',
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.16,
        shadowRadius: 3.0, // Android
      },
    },
    grow: {
      true: {
        flexGrow: 1,
      },
    },
    gutter: {
      ':number': (value) => ({ mx: value }),
      ':string': (value) => ({ mx: value }),
      true: {
        mx: 16,
      },
    },
    items: {
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
    },
    justify: {
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
    },
    load: {
      ':boolean': (show) => ({
        enterStyle: {
          opacity: 0,
          y: show ? -10 : 10,
        },
        exitStyle: !show
          ? {
              animationDuration: 10000,
              opacity: 0,
              y: -10,
              zIndex: 0,
            }
          : undefined,
      }),
    },
    outlined: {
      true: {
        bg: '$none',
        borderWidth: 0.5,
      },
    },
    radius: {
      ':number': (value) => ({ borderRadius: 100_000_000, h: value / 2, w: value / 2 }),
    },
    rounded: {
      1: {
        borderRadius: '$1',
      },
      2: {
        borderRadius: '$2',
      },
      3: {
        borderRadius: '$3',
      },
      true: {
        borderRadius: '$2',
      },
    },
    row: {
      true: {
        flexDirection: 'row',
      },
    },
    shrink: {
      true: {
        flexShrink: 1,
      },
    },
  } as const,
})

const SafeLayoutTop: React.FC<LayoutProps> = (props) => {
  const { top } = useSafeAreaInsets()

  return <Layout {...props} h={top} />
}

const SafeLayoutBottom: React.FC<LayoutProps> = (props) => {
  const { bottom } = useSafeAreaInsets()

  return <Layout {...props} h={bottom} />
}

export type LayoutProps = React.ComponentProps<typeof Layout>

export default Object.assign(Layout, {
  Aniamted: motify(Layout)(),
  KeyboardAware,
  SafeBottom: SafeLayoutBottom,
  SafeTop: SafeLayoutTop,
  Scroll: ScrollLayout,
})
