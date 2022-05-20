import { Controller } from '@nestjs/common'
import { SiteService } from './site.service'

@Controller()
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
}
