import { OmitType, PickType } from '@nestjs/swagger'
import { User } from '../user/entities/user.entity'

export type IUserToken = Omit<User, 'encrypted' | 'bundles'>

export class UserToken implements IUserToken {
  id!: number
  name!: string
  email!: string
}
