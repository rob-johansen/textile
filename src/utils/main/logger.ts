import { app } from 'electron'
import { createLogger, format, transports } from 'winston'
import type { Logform } from 'winston'

const DOUBLE_DIGITS = 2
const MONTH_OFFSET = 1
const TRIPLE_DIGITS = 3

const formatTime = (time: number, padding: number = DOUBLE_DIGITS): string => {
  return `${time}`.padStart(padding, '0')
}

const time = format.printf((info: Logform.TransformableInfo): string => {
  const now = new Date()
  const month: string = formatTime(now.getMonth() + MONTH_OFFSET)
  const date: string = formatTime(now.getDate())
  const year: number = now.getFullYear()
  const hours: string = formatTime(now.getHours())
  const minutes: string = formatTime(now.getMinutes())
  const seconds: string = formatTime(now.getSeconds())
  const ms: string = formatTime(now.getMilliseconds(), TRIPLE_DIGITS)
  return `${month}-${date}-${year} ${hours}:${minutes}:${seconds}.${ms} [${info.level.toUpperCase()}] ${info.message}`
})

export const logger = createLogger({
  exitOnError: false,
  format: format.combine(format.splat(), time), // https://nodejs.org/api/util.html#util_util_format_format_args
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: process.env.NODE_ENV === 'production'
    ? [new transports.File({ dirname: app.getPath('logs'), filename: 'textiles.log' })]
    : [new transports.Console()]
})
