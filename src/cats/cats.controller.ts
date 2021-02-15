import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'
import { JoiValidationPipe } from 'src/JoiValidationPipe'
import { CatsService } from './cats.service'
import { CreateCatDTO } from './dto/create-cat.dto'
import { Cat } from './cat.interface'

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): string {
    return 'this action should returns all cats'
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(Cat))
  async create(@Body() createCatDTO: CreateCatDTO) {
    return 'this action should create a new cat'
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `this action returns a #${id} cat`
  }
}
