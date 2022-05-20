import { Module } from '@nestjs/common'
import { SiteService } from './site.service'
import { SiteController } from './site.controller'
import { LeechModule } from '@shared/leech/leech.module'
import { CloudModule } from '@shared/cloud/cloud.module'

@Module({
  imports: [LeechModule, CloudModule],
  controllers: [SiteController],
  providers: [SiteService]
})
export class SiteModule {}
