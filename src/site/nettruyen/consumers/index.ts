import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { Logger } from '@nestjs/common'
import { NettruyenQueue } from '@site/nettruyen/config/name'

@Processor(NettruyenQueue.NAME)
export class NettruyenConsumers {
  private readonly logger = new Logger(NettruyenConsumers.name)

  @Process(NettruyenQueue.STORIES)
  async transcode(job: Job<unknown>) {
    console.log(job.data)
    console.log('Doing transcode')
    return {}
  }

  @OnQueueActive({ name: NettruyenQueue.STORIES })
  onActive(job: Job) {
    this.logger.debug(`Prossing with ${job.id} with data ${job.data}...`)
  }
}
