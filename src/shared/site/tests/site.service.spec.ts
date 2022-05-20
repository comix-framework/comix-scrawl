import { Test, TestingModule } from '@nestjs/testing'
import { SiteService } from '../site.service'
import { LeechModule } from '@shared/leech/leech.module'
import { CloudModule } from '@shared/cloud/cloud.module'
import { SiteController } from '@shared/site/site.controller'

describe('SiteService', () => {
  let service: SiteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LeechModule, CloudModule],
      controllers: [SiteController],
      providers: [SiteService]
    }).compile()

    service = module.get<SiteService>(SiteService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be successfully', async () => {
    const storyData = await service.getStoryData()
    console.log(storyData)
  })
})
