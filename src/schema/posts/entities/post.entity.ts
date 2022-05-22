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
  postType: string

  @Prop({ type: Types.ObjectId, required: true, index: true })
  target: TargetDocument

  /**
   * Mối quan hệ vs dữ liệu thật
   */
  @Prop({ type: Types.ObjectId, index: true })
  relationship?: Types.ObjectId

  /**
   * Post parent
   */
  @Prop({ type: Types.ObjectId, index: true })
  parent?: Types.ObjectId

  @Prop({ index: true, default: PostStatus.WAILTING, enum: PostStatus })
  postStatus: PostStatus

  @Prop({ required: true, index: true })
  source: string

  @Prop({ type: Number, required: true, index: true })
  createdAt: number

  @Prop({ type: Number, index: true })
  doneAt: number
}

export const PostEntity = SchemaFactory.createForClass(Post)
