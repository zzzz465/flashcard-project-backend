import { ApiHideProperty } from '@nestjs/swagger'
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator'
// import { Card } from '../entities/card.entity'

export class CreateBundleDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsObject({ each: true })
  cards?: any[]

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean = false
}
