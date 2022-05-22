import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategoryEntity } from './entities/category.entity'
import { MongoConnect } from '@database/enums/name'

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: Category.name,
          useFactory: () => {
            const schema = CategoryEntity
            schema.plugin(require('mongoose-slug-generator'))
            return schema
          }
        }
      ],
      MongoConnect.COMIX
    )
  ],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
