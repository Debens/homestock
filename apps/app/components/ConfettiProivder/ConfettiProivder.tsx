import { createContext, type PropsWithChildren, useContext, useState } from 'react'

import LottieView from 'lottie-react-native'
import { StyleSheet } from 'react-native'

type Context = { view: LottieView | null }

const ConfettiContext = createContext<Context | null>(null)

const useConfettiContext = () => {
  const context = useContext(ConfettiContext)
  if (!context) {
    throw new Error('useConfettiContext must be used within a ConfettiProvider')
  }

  return context
}

const styles = StyleSheet.create({ animation: { pointerEvents: 'none', zIndex: 100 } })

export const ConfettiProvider: React.FC<PropsWithChildren> = (props) => {
  const [view, ref] = useState<LottieView | null>(null)

  return (
    <ConfettiContext.Provider value={{ view }}>
      {props.children}
      <LottieView
        ref={ref}
        resizeMode="cover"
        autoPlay={false}
        loop={false}
        style={[StyleSheet.absoluteFill, styles.animation]}
        source={require('../../assets/confetti.json')}
      />
    </ConfettiContext.Provider>
  )
}

export const useConfetti = () => useConfettiContext().view
