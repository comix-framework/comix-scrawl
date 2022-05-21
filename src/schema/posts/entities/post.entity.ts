import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { PostStatus } from '@schema/posts/enums/post-status'
import { TargetDocument } from '@schema/targets/entities/target.entity'

export type PostDocument = Post & Document

@Schema({
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})
export class Post {
  @Prop({ required: true, index: true })
  title: string

  @Prop({ required: true, index: true })
  postType: string

  @Prop({ type: Types.ObjectId, required: true, index: true })
  target: TargetDocument

  @Prop({ index: true, default: PostStatus.WAILTING })
  postStatus: PostStatus

  @Prop({ required: true, index: true })
  source: string

  @Prop({ type: Number, required: true, index: true })
  createdAt: number

  @Prop({ type: Number, required: true, index: true })
  doneAt: number
}

export const PostEntity = SchemaFactory.createForClass(Post)
