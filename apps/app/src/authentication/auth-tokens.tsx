import * as SecureStore from 'expo-secure-store'
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'

export class Token {
  private readonly emitter = new EventEmitter()

  constructor(private readonly key: string) {}

  read = () => SecureStore.getItem(`token.${this.key}`)
  write = (value: string) => {
    SecureStore.setItem(`token.${this.key}`, value, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK })

    this.emitter.emit('change')
  }

  clear = () => {
    SecureStore.deleteItemAsync(`token.${this.key}`)

    this.emitter.emit('change')
  }

  on = (event: 'change', run: (value: string | null) => void) => this.emitter.addListener(event, () => run(this.read()))
}

const access = new Token('access')
const refresh = new Token('refresh')

export const tokens = { access, refresh }
