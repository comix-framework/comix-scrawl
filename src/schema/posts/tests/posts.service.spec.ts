import { Test, TestingModule } from '@nestjs/testing'
import { PostsService } from '../posts.service'
import { DatabaseModule } from '@database/database.module'

describe('PostsService', () => {
  let service: PostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [PostsService]
    }).compile()

    service = module.get<PostsService>(PostsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
