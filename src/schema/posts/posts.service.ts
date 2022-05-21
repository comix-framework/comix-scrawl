import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Post, PostDocument } from '@schema/posts/entities/post.entity'
import { TargetDocument } from '@schema/targets/entities/target.entity'

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private model: Model<PostDocument>) {}

  async findOne(filter: object) {
    return this.model.findOne(filter)
  }

  async find(filter: object): Promise<PostDocument[]> {
    return this.model.find(filter)
  }

  async create(target: TargetDocument, postType: string, source: string) {
    return this.model.create({
      target: target._id,
      postType,
      source,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
  }
}
