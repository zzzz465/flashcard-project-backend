import { PartialType } from '@nestjs/mapped-types'
import { PickType } from '@nestjs/swagger'
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator'
import { Card } from '../entities/card.entity'
import { CreateBundleDto } from './create-bundle.dto'

export class UpdateBundleDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsObject({ each: true })
  cards?: Card[]

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean = false
}
