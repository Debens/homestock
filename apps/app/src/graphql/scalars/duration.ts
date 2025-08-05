import * as dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export type Duration = ReturnType<typeof dayjs.duration>

export const parse = (raw: string): Duration => dayjs.duration(raw)
export const serialise = (value: Duration): string => value.toISOString()
