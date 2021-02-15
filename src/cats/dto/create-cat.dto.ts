import { isString, isInt } from 'class-validator'

export class CreateCatDTO {
  // @isString()
  name: string
  // @isInt()
  age: number
  // @isString()
  breed: string
}
