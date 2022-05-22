import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Story, StoryDocument } from '@comix/stories/entities/story.entity'
import { MongoConnect } from '@database/enums/name'

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story.name, MongoConnect.COMIX)
    private storyModel: Model<StoryDocument>
  ) {}

  async create(doc: any) {
    return this.storyModel.create(doc)
  }
}
