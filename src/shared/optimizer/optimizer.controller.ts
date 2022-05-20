import { Controller } from '@nestjs/common'
import { OptimizerService } from './optimizer.service'

@Controller()
export class OptimizerController {
  constructor(private readonly optimizerService: OptimizerService) {}
}
