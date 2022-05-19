import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CloudService } from './cloud.service'
import { CreateCloudDto } from './dto/create-cloud.dto'
import { UpdateCloudDto } from './dto/update-cloud.dto'

@Controller()
export class CloudController {
  constructor(private readonly cloudService: CloudService) {}

  @MessagePattern('createCloud')
  create(@Payload() createCloudDto: CreateCloudDto) {
    return this.cloudService.create(createCloudDto)
  }

  @MessagePattern('findAllCloud')
  findAll() {
    return this.cloudService.findAll()
  }

  @MessagePattern('findOneCloud')
  findOne(@Payload() id: number) {
    return this.cloudService.findOne(id)
  }

  @MessagePattern('updateCloud')
  update(@Payload() updateCloudDto: UpdateCloudDto) {
    return this.cloudService.update(updateCloudDto.id, updateCloudDto)
  }

  @MessagePattern('removeCloud')
  remove(@Payload() id: number) {
    return this.cloudService.remove(id)
  }
}
