import { forwardRef, type PropsWithChildren, useCallback, useEffect, useImperativeHandle, useRef } from 'react'

import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import Layout from '@/components/Layout/Layout'
import * as easing from '@/src/utils/easing'

type Props = PropsWithChildren<{ onClose?: () => void }>

type Ref = { close: () => void }

export const useModalRef = () => useRef<Ref>(null)

export const ModalScreen = forwardRef<Ref, Props>((props, ref) => {
  const router = useRouter()
  const { onClose = router.back, children } = props

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 300,
      easing: easing.deceleration,
    })
  }, [progress])

  const overlay = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0, 0.4])
    return { backgroundColor: `rgba(0,0,0,${opacity})` }
  })

  const { height } = useWindowDimensions()
  const modal = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [height, 0])
    return { transform: [{ translateY }] }
  })

  const onRequestClose = useCallback(() => {
    progress.value = withTiming(0, { duration: 300, easing: easing.standard }, (isFinished) => {
      if (isFinished) {
        runOnJS(onClose)()
      }
    })
  }, [progress, onClose])

  useImperativeHandle(ref, () => ({ close: onRequestClose }))

  return (
    <Animated.View style={[{ flex: 1 }, overlay]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onRequestClose} />

      <Layout.SafeTop />
      <Animated.View style={[styles.modal, modal]}>
        <Layout.KeyboardAware flex={1} justifyContent="flex-end" pointerEvents="box-none">
          <Layout bg="$background" borderRadius="$3" gutter mb="16">
            {children}
          </Layout>
          <Layout.SafeBottom />
        </Layout.KeyboardAware>
      </Animated.View>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  modal: { flex: 1, justifyContent: 'flex-end', pointerEvents: 'box-none' },
})
