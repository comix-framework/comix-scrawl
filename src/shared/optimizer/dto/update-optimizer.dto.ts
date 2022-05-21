import { PartialType } from '@nestjs/mapped-types'
import { CreateOptimizerDto } from './create-optimizer.dto'

export class UpdateOptimizerDto extends PartialType(CreateOptimizerDto) {
  id: number
}
