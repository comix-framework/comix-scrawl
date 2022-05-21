import { PartialType } from '@nestjs/mapped-types'
import { CreateNettruyenDto } from './create-nettruyen.dto'

export class UpdateNettruyenDto extends PartialType(CreateNettruyenDto) {
  id: number
}
