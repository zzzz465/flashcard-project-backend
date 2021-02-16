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
} from '@nestjs/common'
import { JWTAuthGuard } from 'src/auth/guards/JWTAuth.guard'
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
    return this.bundleService.create({ ...createBundleDto, owner: req.user.id })
  }

  @Get()
  findAll(id?: number) {
    // find user's all bundles
    return this.bundleService.findAll(id)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    // find all bundles
    return this.bundleService.findOne(id)
  }

  @UseGuards(JWTAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Request() req,
    @Body() updateBundleDto: UpdateBundleDto,
  ) {
    const user = this.abilityFactory.createForUser(req.user)
    if (user.can(Action.UPDATE, { id } as any)) {
      return this.bundleService.update(id, updateBundleDto)
    } else {
      throw new HttpException(
        'user can only edit their bundles',
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bundleService.remove(id)
  }
}
