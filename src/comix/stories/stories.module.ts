import { Module } from '@nestjs/common'
import { StoriesService } from './stories.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Story, StorySchema } from '@comix/stories/entities/story.entity'
import { MongoConnect } from '@database/enums/name'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Story.name,
          schema: StorySchema
        }
      ],
      MongoConnect.COMIX
    )
  ],
  providers: [StoriesService],
  exports: [StoriesService]
})
export class StoriesModule {}
