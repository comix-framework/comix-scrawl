import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { StoryDocument } from '@comix/stories/entities/story.entity'
import {
  Chapter,
  ChapterDocument
} from '@comix/chapters/entities/chapter.entity'
import {
  ChapterContent,
  ChapterContentDocument
} from '@comix/chapters/entities/chapter-content.entity'

export interface ICreateChapter {
  name: string
  content: Types.ObjectId[]
  note?: string
  avatar?: string
  order: number
}

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>,
    @InjectModel(ChapterContent.name)
    private chapterContentModel: Model<ChapterContentDocument>
  ) {}

  async create(
    story: StoryDocument,
    doc: ICreateChapter
  ): Promise<ChapterDocument> {
    return this.chapterModel.create({
      ...doc,
      story: story._id,
      createdAt: Date.now()
    })
  }

  async findAll(story: StoryDocument) {
    return this.chapterModel
      .find({ story: story._id })
      .sort({
        order: -1,
        _id: -1
      })
      .select('-content')
  }

  async count(story: StoryDocument) {
    return this.chapterModel.find({ story: story._id }).countDocuments()
  }

  async findOne(filter: object, deep = true) {
    return this.chapterModel.findOne(filter, {}, { autopopulate: deep })
  }

  async findFirstChapter(story: StoryDocument) {
    return this.chapterModel.findOne({ story: story._id }).sort({
      order: 1
    })
  }

  async update(filter: object, doc: object) {
    return this.chapterModel.findOneAndUpdate(filter, doc, {
      returnOriginal: false
    })
  }

  // Chapter content
  async findOneContent(src: string, storage: string) {
    return this.chapterContentModel.findOneAndUpdate(
      { src },
      { storage },
      { returnOriginal: false, upsert: true }
    )
  }

  async delete(chapter: ChapterDocument) {
    return this.chapterModel.findByIdAndDelete(chapter._id)
  }
}
