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
} from '@nestjs/common'
import { JWTAuthGuard } from 'src/auth/guards/JWTAuth.guard'
import { BundleService } from './bundle.service'
import { CreateBundleDto } from './dto/create-bundle.dto'
import { UpdateBundleDto } from './dto/update-bundle.dto'

@Controller('bundles')
export class BundleController {
  constructor(private readonly bundleService: BundleService) {}

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

  @Put(':id') // ?????
  update(@Param('id') id: number, @Body() updateBundleDto: UpdateBundleDto) {
    return this.bundleService.update(id, updateBundleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bundleService.remove(id)
  }
}
