import { Controller } from '@nestjs/common'
import { CloudService } from './cloud.service'

@Controller()
export class CloudController {
  constructor(private readonly cloudService: CloudService) {}
}
