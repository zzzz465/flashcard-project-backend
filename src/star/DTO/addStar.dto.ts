import { IsNumber } from 'class-validator'

export class AddStarDTO {
  @IsNumber()
  bundleId!: number
}
