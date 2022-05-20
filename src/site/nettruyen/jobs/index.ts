import { Injectable, Logger } from '@nestjs/common'
import { NettruyenService } from '@site/nettruyen/nettruyen.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class NettruyenJobs {
  private readonly logger = new Logger(NettruyenJobs.name)

  constructor(
    private readonly nettruyenService: NettruyenService,
    @InjectQueue('nettruyen') private queue: Queue
  ) {}

  @Cron('* * * * * *')
  async handleCron() {
    const result = await this.queue.removeAllListeners()
    this.logger.debug('Cron job')
    await this.queue.add({
      foo: 'bar'
    })
  }
}
