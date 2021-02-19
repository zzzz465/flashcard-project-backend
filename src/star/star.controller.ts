import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  ServiceUnavailableException,
  UseGuards,
} from '@nestjs/common'
import { JWTAuthGuard } from '../auth/guards/JWTAuth.guard'
import { AddStarDTO } from './DTO/addStar.dto'
import { StarService } from './star.service'

@Controller('users/:id/stars')
export class StarController {
  constructor(private readonly starService: StarService) {}

  @Get()
  async getAllStars(@Param('id') userId: number) {
    const stars = await this.starService.getAllStars(userId)
    if (stars) return stars
    else throw new NotFoundException()
  }

  @UseGuards(JWTAuthGuard)
  @HttpCode(201)
  @Post()
  async addStar(@Param('id') userId: number, @Body() addStarDTO: AddStarDTO) {
    const result = await this.starService.addStar(userId, addStarDTO.bundleId)
    switch (result) {
      case 'OK':
        return

      case 'STARS_NOT_EXIST':
        throw new ServiceUnavailableException()
      case 'BUNDLE_NOT_EXIST':
        throw new BadRequestException({ type: 'BUNDLE_NOT_EXIST' })
    }
  }
}
