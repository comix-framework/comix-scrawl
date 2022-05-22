import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Target, TargetDocument } from '@schema/targets/entities/target.entity'
import { MongoConnect } from '@database/enums/name'

@Injectable()
export class TargetsService {
  constructor(
    @InjectModel(Target.name, MongoConnect.CRAWL)
    private model: Model<TargetDocument>
  ) {}

  async upsert(name: string, source: string) {
    return this.model.findOneAndUpdate(
      { name: name.trim().replace(' ', '_') },
      {
        source,
        $setOnInsert: {
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      },
      {
        returnOriginal: false,
        upsert: true
      }
    )
  }

  async count(filter) {
    return this.model.count(filter).countDocuments()
  }

  async findOne(filter) {
    return this.model.findOne(filter)
  }
}
