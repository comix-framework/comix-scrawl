import { Controller } from '@nestjs/common'
import { TargetsService } from './targets.service'

@Controller()
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}
}
