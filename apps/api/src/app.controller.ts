import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import * as fs from 'fs'

const VERSION = JSON.parse(fs.readFileSync('package.json').toString()).version

@Controller()
@ApiTags('application')
export class AppController {
  @Get('health')
  health() {
    return VERSION
  }
}
