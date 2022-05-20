import { Controller } from '@nestjs/common'
import { NettruyenService } from './nettruyen.service'

@Controller()
export class NettruyenController {
  constructor(private readonly nettruyenService: NettruyenService) {}
}
