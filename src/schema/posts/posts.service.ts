import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Post, PostDocument } from '@schema/posts/entities/post.entity'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private historyModel: Model<PostDocument>
  ) {}

  async findOne(filter: object) {
    return this.historyModel.findOne(filter)
  }
}
