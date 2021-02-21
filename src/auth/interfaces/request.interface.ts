import { Request } from 'express'
import { UserToken } from '../jwt.interface'

export interface RequestWithUser extends Request {
  user: UserToken
}
