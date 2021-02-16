import { ApiHideProperty } from '@nestjs/swagger'
import { IsObject, IsOptional, IsString } from 'class-validator'
// import { Card } from '../entities/card.entity'

export class CreateBundleDto {
  @ApiHideProperty()
  owner: string

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsObject({ each: true })
  cards?: any[]
}
