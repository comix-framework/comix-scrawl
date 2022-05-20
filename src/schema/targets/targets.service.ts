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

  create(createTargetDto: CreateTargetDto) {
    return 'This action adds a new target'
  }

  findAll() {
    return `This action returns all targets`
  }

  findOne(id: number) {
    return `This action returns a #${id} target`
  }

  update(id: number, updateTargetDto: UpdateTargetDto) {
    return `This action updates a #${id} target`
  }

  remove(id: number) {
    return `This action removes a #${id} target`
  }
}
