import { Controller } from '@nestjs/common'
import { PostsService } from './posts.service'

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
}
