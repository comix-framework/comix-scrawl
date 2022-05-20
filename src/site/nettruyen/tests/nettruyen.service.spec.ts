import { Test, TestingModule } from '@nestjs/testing'
import { NettruyenService } from '../nettruyen.service'
import { PostsModule } from '@schema/posts/posts.module'
import { DatabaseModule } from '@database/database.module'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TargetsModule } from '@schema/targets/targets.module'
import { TargetsService } from '@schema/targets/targets.service'
import { LeechModule } from '@shared/leech/leech.module'
import { LeechService } from '@shared/leech/leech.service'

describe('NettruyenService', () => {
  let service: NettruyenService
  let targetService: TargetsService
  let leechService: LeechService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.forRoot({
          redis: {
            host: 'localhost',
            port: 6379
          }
        }),
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        DatabaseModule,
        PostsModule,
        TargetsModule,
        LeechModule
      ],
      providers: [NettruyenService]
    }).compile()

    service = module.get<NettruyenService>(NettruyenService)
    targetService = module.get<TargetsService>(TargetsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should unique nettruyen target', async () => {
    await targetService.upsert('nettruyen', 'http://www.nettruyenco.com/')

    const count = await targetService.count({ name: 'nettruyen' })

    expect(count).toEqual(1)
  })

  it('should return story data', async () => {
    await leechService.auto(
      'http://www.nettruyenco.com/truyen-tranh/can-ke-tiep-xuc-191260'
    )
  })
})
