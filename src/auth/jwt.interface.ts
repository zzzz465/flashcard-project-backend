import { OmitType } from '@nestjs/swagger'
import { User } from '../user/entities/user.entity'

export class UserToken extends OmitType(User, ['encrypted', 'bundles']) {}
