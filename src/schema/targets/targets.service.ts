import { Injectable } from '@nestjs/common'
import { CreateTargetDto } from './dto/create-target.dto'
import { UpdateTargetDto } from './dto/update-target.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Target, TargetDocument } from '@schema/targets/entities/target.entity'

@Injectable()
export class TargetsService {
  constructor(@InjectModel(Target.name) private model: Model<TargetDocument>) {}

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
