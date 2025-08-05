import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useLoginMutation } from '../graphql/generated/documents'
import { GeneralError } from '../utils/errors/general-error'
import { type Token, tokens } from './auth-tokens'

type Context = { access: Token; refresh: Token }

const AuthContext = createContext<Context | null>(null)

export const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  return <AuthContext.Provider value={tokens}>{props.children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }

  return context
}

type OnLoginOptions = { onCompleted?: () => void }
export const useLogin = (options: OnLoginOptions = {}) => {
  const { onCompleted } = options

  const { access, refresh } = useAuthContext()

  const [execute, result] = useLoginMutation()
  const onLogin = useCallback(() => {
    execute({
      onCompleted(result) {
        if (result.login.__typename !== 'Verified') {
          return new GeneralError(result.login).snackbar().handle()
        }

        access.write(result.login.tokens.access)
        refresh.write(result.login.tokens.refresh)

        onCompleted?.()
      },
      onError(err) {
        new GeneralError(err).snackbar().handle()
      },
      variables: { email: 'a.debens@gmail.com', password: 'a.debens@gmail.com' },
    })
  }, [execute, onCompleted, access.write, refresh.write])

  return [onLogin, result] as const
}

export const useLogout = () => {
  const { access, refresh } = useAuthContext()

  return useCallback(() => {
    access.clear()
    refresh.clear()
  }, [access.clear, refresh.clear])
}

export const useLoginState = () => {
  const { access } = useAuthContext()

  const [token, update] = useState(access.read())
  useEffect(() => {
    const subscription = access.on('change', update)

    return () => subscription.remove()
  }, [access.on])

  return useMemo(() => !!token, [token])
}
