import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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

      case 'STAR_ALREADY_EXIST':
        throw new ServiceUnavailableException()
      case 'USER_NOT_EXIST':
      case 'BUNDLE_NOT_EXIST':
        throw new BadRequestException({ type: 'BUNDLE_NOT_EXIST' })
    }
  }

  @Delete(':bundle_id')
  @HttpCode(200)
  async deleteStar(
    @Param('bundle_id') bundle_id: number,
    @Param('id') user_id: number,
  ) {
    const result = await this.starService.deleteStar(user_id, bundle_id)
    switch (result) {
      case 'star_not_found':
        return new BadRequestException()

      default:
        return result
    }
  }
}
