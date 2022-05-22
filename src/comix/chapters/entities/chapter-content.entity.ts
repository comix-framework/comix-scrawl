import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ChapterContentDocument = ChapterContent & Document

@Schema({
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})
export class ChapterContent {
  @Prop({ required: true, index: true })
  storage: string

  @Prop({ required: true })
  src: string
}

export const ChapterContentEntity = SchemaFactory.createForClass(ChapterContent)
