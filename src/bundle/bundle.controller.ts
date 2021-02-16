import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { BundleService } from './bundle.service'
import { CreateBundleDto } from './dto/create-bundle.dto'
import { UpdateBundleDto } from './dto/update-bundle.dto'

@Controller('bundles')
export class BundleController {
  constructor(private readonly bundleService: BundleService) {}

  @Post()
  create(@Body() createBundleDto: CreateBundleDto) {
    return this.bundleService.create(createBundleDto)
  }

  @Get()
  findAll() {
    return this.bundleService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bundleService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBundleDto: UpdateBundleDto) {
    return this.bundleService.update(+id, updateBundleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bundleService.remove(+id)
  }
}
