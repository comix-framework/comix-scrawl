import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Story, StoryDocument } from '@comix/stories/entities/story.entity'
import {
  ChapterContent,
  ChapterContentDocument
} from '@comix/chapters/entities/chapter-content.entity'

export type ChapterDocument = Chapter & Document

@Schema({
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})
export class Chapter {
  @Prop({ required: true })
  name: string

  @Prop({ slug: 'name', unique: true, index: true })
  slug: string

  @Prop({ type: Types.ObjectId, ref: Story.name })
  story: StoryDocument

  @Prop()
  avatar: string

  @Prop()
  note: string

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: ChapterContent.name
  })
  content: ChapterContentDocument[]

  @Prop({ min: 0, default: 0 })
  countViews: number

  @Prop({ min: 0, default: 0 })
  countComments: number

  @Prop({ min: 0, default: 0, index: true })
  order: number

  @Prop()
  createdAt: number
}

export const ChapterEntity = SchemaFactory.createForClass(Chapter)
