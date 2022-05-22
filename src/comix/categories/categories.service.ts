import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category, CategoryDocument } from './entities/category.entity'
import { MongoConnect } from '@database/enums/name'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name, MongoConnect.COMIX)
    private categoryModel: Model<CategoryDocument>
  ) {}

  async create(input: object) {
    return this.categoryModel.create(input)
  }

  async upsert(name: string, content = '') {
    const category = await this.categoryModel.findOne({
      name: name.toLowerCase()
    })
    if (category) {
      return category
    }
    return this.create({ name, content })
  }
}
