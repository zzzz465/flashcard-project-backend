import { PartialType } from '@nestjs/mapped-types'
import { PickType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { CreateBundleDto } from './create-bundle.dto'

export class UpdateBundleDto extends PickType(CreateBundleDto, [
  'cards',
  'description',
  'title',
] as const) {}
