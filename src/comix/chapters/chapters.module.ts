import { Module } from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Chapter, ChapterEntity } from '@comix/chapters/entities/chapter.entity'
import {
  ChapterContent,
  ChapterContentEntity
} from '@comix/chapters/entities/chapter-content.entity'
import { MongoConnect } from '@database/enums/name'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Chapter.name,
          schema: ChapterEntity
        }
      ],
      MongoConnect.COMIX
    ),
    MongooseModule.forFeature(
      [
        {
          name: ChapterContent.name,
          schema: ChapterContentEntity
        }
      ],
      MongoConnect.COMIX
    )
  ],
  providers: [ChaptersService],
  exports: [ChaptersService]
})
export class ChaptersModule {}
