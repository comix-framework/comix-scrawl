import { Controller } from '@nestjs/common'
import { LeechService } from './leech.service'

@Controller()
export class LeechController {
  constructor(private readonly requestService: LeechService) {}
}
