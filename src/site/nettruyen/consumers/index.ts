import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { Logger } from '@nestjs/common'

@Processor('nettruyen')
export class NettruyenConsumers {
  private readonly logger = new Logger(NettruyenConsumers.name)

  @Process()
  async transcode(job: Job<unknown>) {
    console.log(job.data)
    console.log('Doing transcode')
    return {}
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Prossing with ${job.id} with data ${job.data}...`)
  }
}
