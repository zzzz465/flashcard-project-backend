import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator'
import { Bundle } from '../entities/bundle.entity'
import { Card } from '../entities/card.entity'

export class UpdateBundleDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsObject({ each: true })
  cards!: Card[] // length >= 1 (required)

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean = false
}

export class UpdateBundleResponseDTO extends Bundle {}
