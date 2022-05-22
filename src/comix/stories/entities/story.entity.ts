import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  Category,
  CategoryDocument
} from '@comix/categories/entities/category.entity'
import { Types, Document } from 'mongoose'
import { StoryStatus } from '@comix/stories/enum/story.status.enum'

export type StoryDocument = Story & Document

@Schema({
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})
export class Story {
  @Prop({ required: true, index: true })
  name: string

  @Prop({ slug: 'name', unique: true, index: true })
  slug: string

  @Prop({ required: true })
  avatar: string

  @Prop({ default: '' })
  content: string

  @Prop({
    type: Types.ObjectId
  })
  user: Types.ObjectId

  @Prop({ index: true })
  authors: string

  @Prop({ index: true })
  teams: string

  @Prop({ index: true, default: StoryStatus.ON_GOING })
  status: StoryStatus

  @Prop({ min: 0, default: 0, index: true })
  countViews: number

  @Prop({ min: 0, default: 0, index: true })
  countComments: number

  @Prop({ min: 0, default: 0, index: true })
  countRating: number

  @Prop({ min: 0, default: 0, index: true })
  totalRating: number

  @Prop({ min: 0, default: 0, index: true })
  countBookmark: number

  @Prop({
    type: [{ type: Types.ObjectId, ref: Category.name }],
    index: true
  })
  categories: CategoryDocument[]

  @Prop({ default: Date.now, index: true })
  createdAt: number

  @Prop({ default: Date.now, index: true })
  updatedAt: number
}

export const StorySchema = SchemaFactory.createForClass(Story)
