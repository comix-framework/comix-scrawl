import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CategoryDocument = Category & Document

@Schema()
export class Category {
  @Prop({ required: true, lowercase: true, trim: true })
  name: string

  @Prop({ slug: 'name', unique: true })
  slug: string

  @Prop({ default: '' })
  content: string
}

export const CategoryEntity = SchemaFactory.createForClass(Category)
