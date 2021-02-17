import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Query,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { JWTAuthGuard } from '../auth/guards/JWTAuth.guard'
import { BundleService } from './bundle.service'
import { Action, BundleAbilityFactory } from './casl-ability.factory'
import { CreateBundleDto } from './dto/create-bundle.dto'
import { UpdateBundleDto } from './dto/update-bundle.dto'
import { Bundle } from './entities/bundle.entity'

@Controller('bundles')
export class BundleController {
  constructor(
    private readonly bundleService: BundleService,
    private readonly abilityFactory: BundleAbilityFactory,
  ) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  create(@Body() createBundleDto: CreateBundleDto, @Request() req: any) {
    return this.bundleService.create(req.user, createBundleDto)
  }

  @Get()
  @ApiQuery({ name: 'userId', type: Number, required: false })
  findAll(@Query('userId') userId?: number) {
    return this.bundleService.findAll(userId)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.bundleService.findOne(id)
    if (result) return result
    else throw new NotFoundException()
  }

  @UseGuards(JWTAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Request() req,
    @Body() updateBundleDto: UpdateBundleDto,
  ) {
    const result = this.bundleService.update(id, req.user, updateBundleDto)
    if (typeof result !== 'boolean') return result
    else
      throw new HttpException(
        'user can only edit their bundles',
        HttpStatus.UNAUTHORIZED,
      )
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const result = await this.bundleService.remove(id, req.user)
    switch (result) {
      case 'SUCCESS':
        return 'ok'

      case 'UNAUTHORIZED':
        throw new UnauthorizedException()

      case 'NOTFOUND':
        throw new NotFoundException()
    }
  }
}
