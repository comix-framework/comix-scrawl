import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TargetDocument = Target & Document

@Schema({
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})
export class Target {
  @Prop({ required: true, index: true })
  name: string

  @Prop({ required: true, index: true, default: false })
  active: boolean

  @Prop({ required: true, index: true })
  source: string

  @Prop({ required: true, index: true })
  createdAt: number

  @Prop({ required: true, index: true })
  updatedAt: number
}

export const TargetEntity = SchemaFactory.createForClass(Target)
