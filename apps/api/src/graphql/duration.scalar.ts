import { type CustomScalar, Scalar } from '@nestjs/graphql'
import * as dayjs from 'dayjs'
import { Kind, type ValueNode } from 'graphql'

export type Duration = ReturnType<typeof dayjs.duration>

@Scalar('Duration')
export class DurationScalar implements CustomScalar<string, Duration> {
  description = 'ISO 8601 duration'

  parseValue = (v: string) => dayjs.duration(v)

  serialize = (v: Duration) => v.toISOString()

  parseLiteral = (ast: ValueNode) => (ast.kind === Kind.STRING ? dayjs.duration(ast.value) : null)
}
