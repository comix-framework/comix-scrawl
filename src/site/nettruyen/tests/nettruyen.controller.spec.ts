import { Test, TestingModule } from '@nestjs/testing'
import { NettruyenController } from '../nettruyen.controller'
import { NettruyenService } from '../nettruyen.service'

describe('NettruyenController', () => {
  let controller: NettruyenController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NettruyenController],
      providers: [NettruyenService]
    }).compile()

    controller = module.get<NettruyenController>(NettruyenController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
