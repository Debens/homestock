import dayjs from 'dayjs'

export const parse = (raw: string): dayjs.Dayjs => dayjs(raw)
export const serialise = (value: dayjs.Dayjs): string => value.format('YYYY-MM-DD')
