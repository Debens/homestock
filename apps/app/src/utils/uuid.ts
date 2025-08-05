import { useMemo } from 'react'

import * as Crypto from 'expo-crypto'

export const useUuid = () => useMemo(() => Crypto.randomUUID(), [])
