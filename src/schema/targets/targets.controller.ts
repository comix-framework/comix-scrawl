import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { TargetsService } from './targets.service'
import { CreateTargetDto } from './dto/create-target.dto'
import { UpdateTargetDto } from './dto/update-target.dto'

@Controller()
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}

  @MessagePattern('createTarget')
  create(@Payload() createTargetDto: CreateTargetDto) {
    return this.targetsService.create(createTargetDto)
  }

  @MessagePattern('findAllTargets')
  findAll() {
    return this.targetsService.findAll()
  }

  @MessagePattern('findOneTarget')
  findOne(@Payload() id: number) {
    return this.targetsService.findOne(id)
  }

  @MessagePattern('updateTarget')
  update(@Payload() updateTargetDto: UpdateTargetDto) {
    return this.targetsService.update(updateTargetDto.id, updateTargetDto)
  }

  @MessagePattern('removeTarget')
  remove(@Payload() id: number) {
    return this.targetsService.remove(id)
  }
}
