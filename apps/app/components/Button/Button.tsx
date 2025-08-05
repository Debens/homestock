import { styled, Button as TamaguiButton } from 'tamagui'

export const Button = styled(TamaguiButton, {
  alignItems: 'center',
  borderRadius: 16,
  defaultVariants: {
    variant: 'primary',
  },
  elevation: 1,
  flexDirection: 'row',
  fontWeight: '700',
  height: 56,
  justifyContent: 'center',
  name: 'Button',
  unstyled: true,
  variants: {
    loading: {
      true: {
        disabled: true,
      },
    },
    variant: {
      primary: {
        backgroundColor: '$button',
        color: '$text-on-dark',
        pressStyle: { bg: '$button-active' },
        shadowColor: '$shadow',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 1.0,
      },
      secondary: {
        backgroundColor: '$button-muted',
        borderColor: '$primary',
        borderWidth: 1.2,
        color: '$primary',
        pressStyle: { bg: '$button-muted-pressed' },
        shadowColor: 'unset',
      },
    },
  },
  width: '100%',
})
