import { registerAs } from '@nestjs/config'

export default registerAs('supabase', async () => ({
  key: String(process.env.SUPABASE_KEY),
  url: String(process.env.SUPABASE_URL),
}))
