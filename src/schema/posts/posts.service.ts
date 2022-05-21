import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Post, PostDocument } from '@schema/posts/entities/post.entity'
import { TargetDocument } from '@schema/targets/entities/target.entity'

interface ICreatePost {
  target: TargetDocument
  postType: string
  source: string
  parent?: Types.ObjectId
}

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private model: Model<PostDocument>) {}

  async findOne(filter: object) {
    return this.model.findOne(filter)
  }

  async find(filter: object): Promise<PostDocument[]> {
    return this.model.find(filter)
  }

  async create({ target, postType, source, parent }: ICreatePost) {
    return this.model.create({
      target: target._id,
      postType,
      source,
      parent,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
  }

  async update(post: PostDocument, update: object) {
    return this.model.findByIdAndUpdate(post._id, update, { new: true })
  }
}
