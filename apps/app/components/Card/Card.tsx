import { styled } from 'tamagui'

import Layout from '../Layout/Layout'

export const Card = styled(Layout, {
  borderRadius: 12,
  defaultVariants: {
    size: 'default',
    tone: 'default',
  },
  name: 'Card',
  variants: {
    size: {
      compact: {
        p: 8,
      },
      default: {
        p: 16,
      },
    },
    tone: {
      default: {
        backgroundColor: '$surface',
      },
    },
  } as const,
})
