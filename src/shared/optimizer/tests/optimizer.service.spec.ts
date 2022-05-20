import { Test, TestingModule } from '@nestjs/testing'
import * as fs from 'fs'

import { OptimizerService } from '../optimizer.service'
import * as path from 'path'

describe('OptimizerService', () => {
  let service: OptimizerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimizerService]
    }).compile()

    service = module.get<OptimizerService>(OptimizerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be buffer', async () => {
    const _path = path.join(__dirname, '../storage/0.jpeg')

    const buffer = await service.resize(_path, {
      width: 200,
      height: 200
    })

    const _newPath = path.join(__dirname, '../storage/0_resize.jpeg')

    fs.writeFileSync(_newPath, buffer)

    expect(buffer).toBeInstanceOf(Buffer)
  })
})
