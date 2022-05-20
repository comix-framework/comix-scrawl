import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SiteJobs {
  private readonly logger = new Logger(SiteJobs.name)
}
