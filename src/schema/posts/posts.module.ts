import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostEntity } from '@schema/posts/entities/post.entity'
import { MongoConnect } from '@database/enums/name'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Post.name,
          schema: PostEntity
        }
      ],
      MongoConnect.CRAWL
    )
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
