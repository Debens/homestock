import { registerAs } from '@nestjs/config'

export default registerAs('app', async () => ({
  port: String(process.env.SERVER_PORT)!,
}))
