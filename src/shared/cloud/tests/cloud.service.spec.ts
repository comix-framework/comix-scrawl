import { Test, TestingModule } from '@nestjs/testing'
import { CloudService } from '../cloud.service'
import { HttpModule } from '@nestjs/axios'

describe('CloudService', () => {
  let service: CloudService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CloudService]
    }).compile()

    service = module.get<CloudService>(CloudService)
  })

  it('should be ArrayBuffer', async () => {
    const data = await service.downloadImage(
      'http://st.nettruyenco.com/data/comics/168/chung-cu-yeu-quai.jpg',
      {}
    )

    expect(data).toBeInstanceOf(Buffer)
  })
})
