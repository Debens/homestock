import { Text as Base, styled } from 'tamagui'

const Text = styled(Base, {
  // default text color for all variants
  color: '$foreground',

  defaultVariants: {
    align: 'left',
    color: 'default',
    variant: 'body',
  } as const,
  name: 'Typography',

  variants: {
    align: {
      center: { textAlign: 'center' },
      justify: { textAlign: 'justify' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
    },

    bold: {
      true: {
        fontWeight: '700',
      },
    },

    color: {
      ':string': (val: string) => ({ color: val }),
      accent: { color: '$accent' },
      default: { color: '$text' },
      muted: { color: '$text-muted' },
    } as const,

    variant: {
      body: {
        fontFamily: '$body',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24, // 16 * 1.5
      },

      caption: {
        fontFamily: '$body',
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 17, // 12 * 1.4
      },
      h1: {
        fontFamily: '$heading',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 38, // 32 * 1.2
      },
      h2: {
        fontFamily: '$heading',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 31, // 24 * 1.3
      },
      h3: {
        fontFamily: '$heading-sm',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 27, // 20 * 1.35
      },
      small: {
        fontFamily: '$body',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21, // 16 * 1.5
      },
      tag: {
        fontFamily: '$body',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 17, // 12 * 1.4
      },
      tiny: {
        fontFamily: '$body',
        fontSize: 10,
        fontWeight: '300',
        lineHeight: 10,
      },
    },
  },
} as const)

export type TextProps = React.ComponentProps<typeof Text>

export default Text
