import { Test, TestingModule } from '@nestjs/testing'
import { NettruyenService } from '../nettruyen.service'
import { PostsModule } from '@schema/posts/posts.module'
import { DatabaseModule } from '@database/database.module'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TargetsModule } from '@schema/targets/targets.module'
import { LeechModule } from '@shared/leech/leech.module'

describe('NettruyenService', () => {
  let service: NettruyenService

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
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return story data', async () => {
    await service.load(
      'http://www.nettruyenco.com/truyen-tranh/su-tro-lai-cua-nguoi-choi-cap-cao-nhat-351340'
    )
    const stories = service.getStoryData()

    console.log(stories)

    expect(stories).toBeDefined()
  })

  it('should return chapter data', async () => {
    await service.load(
      'http://www.nettruyenco.com/truyen-tranh/su-tro-lai-cua-nguoi-choi-cap-cao-nhat/chap-128/854820'
    )
    console.log(service.getChapterData())
  })
})
