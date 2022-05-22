import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Post, PostDocument } from '@schema/posts/entities/post.entity'
import { MongoConnect } from '@database/enums/name'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name, MongoConnect.CRAWL)
    private model: Model<PostDocument>
  ) {}

  async findOne(filter: object) {
    return this.model.findOne(filter)
  }

  async find(filter: object): Promise<PostDocument[]> {
    return this.model.find(filter)
  }

  async create(doc: object) {
    return this.model.create({
      ...doc,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
  }

  async update(post: PostDocument, update: object) {
    return this.model.findByIdAndUpdate(post._id, update, { new: true })
  }
}
