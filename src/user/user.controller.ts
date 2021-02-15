import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common'
import { CreateUserDTO } from './DTO/CreateUser.dto'
import { FindOneParams } from './DTO/FindOneParams'

@Controller('user')
export class UserController {
  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return 'this action adds a new user'
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return 'This action returns a user'
  }

  @Get()
  findByIds(
    @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    // request: GET /?ids=1,2,3
    return 'this action returns users by ids'
  }
}
